module.exports = {
  apps: [
    {
      name: 'aoe4fr-backend',
      script: 'apps/backend/dist/main.js',
      cwd: '/home/ubuntu/aoe4.fr',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        CORS_ORIGIN: 'https://aoe4.fr,https://ordreduwololo.fr',
      },
    },
  ],
};
