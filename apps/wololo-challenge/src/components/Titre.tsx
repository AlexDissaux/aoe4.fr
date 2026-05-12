

export function Titre() {
    {/* Titre principal */}
    return (            
        <div className="text-center py-8 sm:py-12">
            <p className="text-gray-400 text-sm sm:text-base font-semibold tracking-widest uppercase mb-2">
                L'Ordre du Wololo Présente
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 pb-3 tracking-tight animate-pulse-subtle drop-shadow-2xl">
                Le Wololo Challenge !
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-transparent via-yellow-400 to-orange-500"></div>
                <div className="w-3 h-3 bg-yellow-400 rotate-45 animate-spin-slow"></div>
                <div className="h-1 w-16 sm:w-24 bg-gradient-to-l from-transparent via-orange-500 to-red-500"></div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base font-semibold tracking-widest uppercase">
                Age of Empires IV • Ranked 1v1
            </p>
        </div>
    )    
}