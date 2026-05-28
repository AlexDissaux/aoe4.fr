

interface SeparatorProps {
    view: 'podium' | 'teams' | 'players';
    onViewChange: (view: 'podium' | 'teams' | 'players') => void;
}

export default function Separator({ view, onViewChange }: SeparatorProps) {
    return (
        <div className="w-full bg-gray-900/80 backdrop-blur-sm border-y border-gray-700/50 shadow-lg">
            <div className="flex items-stretch h-16 sm:h-20">
                {/* Bouton Équipes */}
                <button
                    onClick={() => onViewChange('teams')}
                    className={`relative overflow-hidden font-black text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-700 ease-in-out group ${
                        view === 'teams'
                            ? 'flex-[0.70] bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20' 
                            : 'flex-[0.15] bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-red-600/30 hover:from-yellow-500/40 hover:via-orange-500/40 hover:to-red-500/40 hover:scale-[1.02] cursor-pointer'
                    }`}
                >
                    {/* Effet de brillance au survol */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                    
                    {/* Bordure animée en bas */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-700 ${
                        view === 'teams' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}></div>
                    
                    {/* Bordure latérale pour bouton inactif */}
                    {view !== 'teams' && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
                    )}
                    
                    {/* Contenu du bouton */}
                    <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-700`}>
                        <svg className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 transition-all duration-700 ${view === 'teams' ? 'scale-110' : 'scale-100 group-hover:scale-110 animate-bounce'} ${
                            view === 'teams'
                                ? 'fill-yellow-400' 
                                : 'fill-yellow-300 group-hover:fill-yellow-200'
                        }`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        <span className={`ml-2 sm:ml-3 transition-all duration-700 font-black ${
                            view === 'teams'
                                ? 'opacity-100 max-w-full text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' 
                                : 'opacity-0 max-w-0 overflow-hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400'
                        }`}>
                            Équipes
                        </span>
                    </div>
                    
                    {/* Effet de lueur pour le bouton actif */}
                    {view === 'teams' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>
                    )}
                    
                    {/* Effet de pulsation subtile pour bouton inactif */}
                    {view !== 'teams' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 animate-pulse"></div>
                    )}
                </button>

                {/* Bouton Podium */}
                <button
                    onClick={() => onViewChange('podium')}
                    className={`relative overflow-hidden font-black text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-700 ease-in-out group ${
                        view === 'podium'
                            ? 'flex-[0.70] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20' 
                            : 'flex-[0.15] bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-rose-600/30 hover:from-purple-500/40 hover:via-pink-500/40 hover:to-rose-500/40 hover:scale-[1.02] cursor-pointer'
                    }`}
                >
                    {/* Effet de brillance au survol */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                    
                    {/* Bordure animée en bas */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 transition-all duration-700 ${
                        view === 'podium' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}></div>
                    
                    {/* Bordure latérale pour bouton inactif */}
                    {view !== 'podium' && (
                        <>
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-500 to-rose-500 animate-pulse"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-500 to-rose-500 animate-pulse"></div>
                        </>
                    )}
                    
                    {/* Contenu du bouton */}
                    <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-700`}>
                        <span className={`text-2xl sm:text-3xl transition-all duration-700 ${view === 'podium' ? 'scale-110' : 'scale-100 group-hover:scale-110 animate-bounce'}`}>
                            🏆
                        </span>
                        <span className={`ml-2 sm:ml-3 transition-all duration-700 font-black ${
                            view === 'podium'
                                ? 'opacity-100 max-w-full text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500' 
                                : 'opacity-0 max-w-0 overflow-hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-rose-400'
                        }`}>
                            Podium
                        </span>
                    </div>
                    
                    {/* Effet de lueur pour le bouton actif */}
                    {view === 'podium' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 animate-pulse"></div>
                    )}
                    
                    {/* Effet de pulsation subtile pour bouton inactif */}
                    {view !== 'podium' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-rose-500/5 animate-pulse"></div>
                    )}
                </button>

                {/* Bouton Joueurs */}
                <button
                    onClick={() => onViewChange('players')}
                    className={`relative overflow-hidden font-black text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-700 ease-in-out group ${
                        view === 'players'
                            ? 'flex-[0.70] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20' 
                            : 'flex-[0.15] bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 hover:from-blue-500/40 hover:via-purple-500/40 hover:to-pink-500/40 hover:scale-[1.02] cursor-pointer'
                    }`}
                >
                    {/* Effet de brillance au survol */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                    
                    {/* Bordure animée en bas */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-700 ${
                        view === 'players' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}></div>
                    
                    {/* Bordure latérale pour bouton inactif */}
                    {view !== 'players' && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 animate-pulse"></div>
                    )}
                    
                    {/* Contenu du bouton */}
                    <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-700`}>
                        <svg className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 transition-all duration-700 ${view === 'players' ? 'scale-110' : 'scale-100 group-hover:scale-110 animate-bounce'} ${
                            view === 'players'
                                ? 'fill-blue-400' 
                                : 'fill-blue-300 group-hover:fill-blue-200'
                        }`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span className={`ml-2 sm:ml-3 transition-all duration-700 font-black ${
                            view === 'players'
                                ? 'opacity-100 max-w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500' 
                                : 'opacity-0 max-w-0 overflow-hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400'
                        }`}>
                            Joueurs
                        </span>
                    </div>
                    
                    {/* Effet de lueur pour le bouton actif */}
                    {view === 'players' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    )}
                    
                    {/* Effet de pulsation subtile pour bouton inactif */}
                    {view !== 'players' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
                    )}
                </button>
            </div>
        </div>
    )
}