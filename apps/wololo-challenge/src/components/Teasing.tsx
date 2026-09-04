export default function Teasing() {
  return (
    <div className="px-4 py-6 space-y-5">
      <img
        src="/wololo-challenge-logo.png"
        alt="Wololo Challenge"
        className="hidden lg:block w-full max-w-[220px]"
      />
      <p className="text-2xl font-black uppercase leading-tight tracking-wide text-white">
        Who will be the best team on the ladder?
      </p>

      <div className="border-l-2 border-amber-300/70 pl-4 space-y-3">
        <p className="text-sm leading-relaxed text-gray-400">
          Every game can flip the rankings. Watch the streams, track the podium, and follow the sprint to the top.
        </p>
      </div>

      <div className="inline-flex items-baseline gap-2">
        <span className="text-4xl font-black text-amber-300 tracking-tight">2 000 $</span>
        <span className="text-sm font-bold uppercase tracking-widest text-amber-200/70">Cash Prize</span>
      </div>
    </div>
  );
}