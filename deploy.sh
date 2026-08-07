#!/usr/bin/env bash
set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
VPS_USER="ubuntu"
VPS_HOST="51.91.110.165"
VPS_PORT="22"
REMOTE_DIR="/home/ubuntu/aoe4.fr"
CONTROL_PATH="/tmp/aoe4fr-ssh-%r@%h:%p"
SSH_OPTS="-p ${VPS_PORT} -o StrictHostKeyChecking=no -o ControlMaster=auto -o ControlPersist=10m -o ControlPath=${CONTROL_PATH}"

cleanup_ssh_master() {
  ssh ${SSH_OPTS} -O exit "${VPS_USER}@${VPS_HOST}" >/dev/null 2>&1 || true
}
trap cleanup_ssh_master EXIT

# ── Build ──────────────────────────────────────────────────────────────────────
echo "▶ Build & prune du backend…"
# prune enchaîne : build → prune-lockfile (génère dist/package.json + dist/package-lock.json)
#                         → copy-workspace-modules
npx nx run backend:prune

echo "▶ Build du frontend…"
npx nx build frontend --prod

echo "▶ Build de wololo-challenge…"
npx nx build wololo-challenge --prod

# ── Déploiement sur le VPS ─────────────────────────────────────────────────────
echo "▶ Déploiement sur ${VPS_HOST}…"

# Open a persistent SSH connection once so rsync does not ask password repeatedly.
ssh ${SSH_OPTS} -Nf "${VPS_USER}@${VPS_HOST}"

# Créer la structure distante si nécessaire
ssh ${SSH_OPTS} "${VPS_USER}@${VPS_HOST}" "mkdir -p ${REMOTE_DIR}/apps/backend ${REMOTE_DIR}/dist/apps/frontend ${REMOTE_DIR}/dist/apps/wololo-challenge"

# Sync backend (dist compilé + package.json + package-lock.json générés par prune)
rsync -az --delete \
  -e "ssh ${SSH_OPTS}" \
  apps/backend/dist/ \
  "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/apps/backend/dist/"

# Installer les dépendances de production sur le VPS
# (suppression du lockfile cassé par Nx prune, install depuis package.json)
echo "▶ npm install --omit=dev sur le VPS…"
ssh ${SSH_OPTS} "${VPS_USER}@${VPS_HOST}" \
  "cd ${REMOTE_DIR}/apps/backend/dist && rm -rf node_modules package-lock.json && npm install --omit=dev --no-fund --no-audit"

# Sync frontend (fichiers statiques)
rsync -az --delete \
  -e "ssh ${SSH_OPTS}" \
  dist/apps/frontend/ \
  "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/dist/apps/frontend/"

# Sync wololo-challenge (fichiers statiques, servis sur ordreduwololo.fr)
rsync -az --delete \
  -e "ssh ${SSH_OPTS}" \
  dist/apps/wololo-challenge/ \
  "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/dist/apps/wololo-challenge/"

# Sync fichiers de config PM2 et Nginx
rsync -az \
  -e "ssh ${SSH_OPTS}" \
  ecosystem.config.cjs \
  "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/"

# ── Rechargement PM2 ───────────────────────────────────────────────────────────
echo "▶ Rechargement PM2…"
ssh ${SSH_OPTS} "${VPS_USER}@${VPS_HOST}" \
  "cd ${REMOTE_DIR} && pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs"

echo "✅ Déploiement terminé !"
