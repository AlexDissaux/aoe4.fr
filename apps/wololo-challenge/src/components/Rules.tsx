export default function Rules() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Rules</h2>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="text-gray-400 text-sm">Official rules of the Wololo Challenge</p>
            </div>

            <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
                <section className="border-l-2 border-amber-300/70 pl-4 space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-white">1. Coming soon</h3>
                    <p>The rules coming at the speed of the light and will be there in a predictable time.</p>
                </section>
            </div>

            <div className="border border-amber-300/20 bg-amber-300/5 px-5 py-4 text-xs text-amber-200/70 text-center">
                These rules are subject to change — check back for the final version before the challenge starts.
            </div>
        </div>
    );
}
