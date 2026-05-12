export type TeamsNameAndId = {
    name: string,
    points: number;
    acronyme: string,
    players : Array<{id: string, isCap? : boolean}>
}

export const sinceDate = '2026-05-07T23:00:00.000Z'
export const endDate = '2026-05-12T21:00:00.000Z'

export const teamsNameAndId: TeamsNameAndId[] = [
    {    
        name: "L'Ordre des Carnivaures",
        points: 0,
        acronyme: "ODC",
        players : [
            {id: "8953699", isCap : true}, // Ours
            {id: "15624724", isCap : false}, // Stay_Frosty
            {id: "7319091", isCap : false}, // Slender
            {id: "21796931", isCap : false}, // Totox
            {id: "17594012", isCap : false}, // Rod
        ]
    },
    {    
        name: "La Harde D'Argent",
        points: 1,
        acronyme: "LHA",
        players : [
            {id: "22751220", isCap : true}, // Eleva
            {id: "15289018", isCap : false}, // Tarlanors
            {id: "14400153", isCap : false}, // The_Vegas
            {id: "1421448", isCap : false}, // Xelforce
            {id: "15012300", isCap : false}, // Oulala
        ]
    },
    {    
        name: "Super Sayan",
        points: 0,
        acronyme: "SSJ",
        players : [
            {id: "5556271", isCap : true}, // Joepescie
            {id: "6550325", isCap : false}, // Bob
            {id: "790039", isCap : false}, // Marin_Deaudouce
            {id: "2103888", isCap : false}, // Horgeek
            {id: "20704115", isCap : false}, // Manishax_Calni
        ]
    },
    {    
        name: "Les Traqueurs de Relique",
        points: 1,
        acronyme: "LTDR",
        players : [
            {id: "1712108", isCap : true}, // Trakor
            {id: "23800459", isCap : false}, // nicolas
            {id: "23160801", isCap : false}, // Firefooxs
            {id: "1947541", isCap : false}, // Rellik
            {id: "9254518", isCap : false}, // Caius
        ]
    },
    {    
        name: "La Wololhorde",
        points: 1,
        acronyme: "HDW",
        players : [
            {id: "9754661", isCap : true}, // The_Tost
            {id: "2866310", isCap : false}, // Monster
            {id: "358437", isCap : false}, // Epiviosi
            {id: "12029658", isCap : false}, // Alyce
        ]
    },
    {    
        name: "Wololo de L'Ordre",
        points: 0,
        acronyme: "WDO",
        players : [
            {id: "22598716", isCap : true}, // Vegeta
            {id: "23866592", isCap : false}, // Druss
            {id: "1432106", isCap : false}, // Cjee
            {id: "10605002", isCap : false}, // Val
            {id: "6732245", isCap : false}, // Xelkara

        ]
    },
    {    
        name: "Le Culte du Cosmos",
        points: 1,
        acronyme: "CDC",
        players : [
            {id: "19206930", isCap : true}, // Cosmos
            {id: "12170036", isCap : false}, // Vox
            {id: "8250217", isCap : false}, // Bulky
            {id: "1365135", isCap : false}, // La_CAF
            {id: "20868210", isCap : false}, // ElectroShock
        ]
    },
    {    
        name: "Les Wolozors",
        points: 0,
        acronyme: "WLRS",
        players : [
            {id: "18963110", isCap : true}, // Rollos
            {id: "11575115", isCap : false}, // Coco
            {id: "8275065", isCap : false}, // Bucéphale
            {id: "23387649", isCap : false}, // Niwaj
            {id: "4314006", isCap : false}, // Raptor
        ]
    },
    {    
        name: "Inflation",
        points: 1,
        acronyme: "INF",
        players : [
            {id: "8201966", isCap : true}, // Nicnic
            {id: "22599330", isCap : false}, // Kirri
            {id: "3402532", isCap : false}, // Kiwoh
            {id: "21242620", isCap : false}, // Narkoo
            {id: "8989366", isCap : false}, // Mascro
        ]
    },
]


// {id: "20391264", isCap : false}, // LeBigl
