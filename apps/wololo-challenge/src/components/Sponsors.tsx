type Sponsor = {
    name: string;
    logo: string;
    description: string;
    links?: { label: string; url: string }[];
};

const SPONSORS: Sponsor[] = [
    {
        name: 'Amazon',
        logo: '/Amazon.jpg',
        description: 'Amazon is supporting the Wololo Challenge with a generous financial contribution, helping us bring this event to life.',
    },
    {
        name: 'NightShiftGaming',
        logo: '/NightShiftGaming.jpg',
        description: 'NightShiftGaming is supporting the event and helping us make the Wololo Challenge bigger, more international, and more ambitious. A huge thank you to Carlo / NightShiftGaming for believing in the project and supporting the adventure!',
        links: [
            { label: 'Website', url: 'https://nightshiftgaming.gg/' },
            { label: 'Twitch', url: 'https://www.twitch.tv/nightshiftgaming5' },
            { label: 'YouTube', url: 'https://www.youtube.com/@NightShiftGaming5' },
        ],
    },
];

export default function Sponsors() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Sponsors</h2>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="text-gray-400 text-sm">They support the Wololo Challenge — thank you!</p>
            </div>

            <div className="space-y-6">
                {SPONSORS.map(sponsor => (
                    <div
                        key={sponsor.name}
                        className="border border-amber-300/20 bg-amber-300/5 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
                    >
                        <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="w-32 h-32 sm:w-28 sm:h-28 object-contain bg-white/5 rounded-md p-2 flex-shrink-0"
                        />
                        <div className="space-y-3 text-center sm:text-left">
                            <h3 className="font-bold uppercase tracking-wider text-white">{sponsor.name}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{sponsor.description}</p>
                            {sponsor.links && (
                                <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-1">
                                    {sponsor.links.map(link => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold uppercase tracking-widest text-amber-300 hover:text-white border border-amber-300/40 hover:border-white/40 px-3 py-1.5 transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border border-amber-300/20 bg-amber-300/5 px-5 py-4 text-xs text-amber-200/70 text-center">
                Interested in sponsoring the Wololo Challenge? Get in touch with the organizers!
            </div>
        </div>
    );
}
