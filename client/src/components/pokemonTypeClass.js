export const pokemonTypeClass = (pokeType) => {
    switch(pokeType){
        case 'Normal':
            return {
                cardBg: 'NormalBgCard',
                pill: 'NormalBgPill',
                pageBg: ''
            }
        case 'Fighting':
            return {
                cardBg: 'FightingBgCard',
                pill: 'FightingBgPill',
                pageBg: ''
            }
        case 'Flying':
            return {
                cardBg: 'FlyingBgCard',
                pill: 'FlyingBgPill',
                pageBg: ''
            }
        case 'Poison':
            return {
                cardBg: 'PoisonBgCard',
                pill: 'PoisonBgPill',
                pageBg: ''
            }
        case 'Ground':
            return {
                cardBg: 'GroundBgCard',
                pill: 'GroundBgPill',
                pageBg: ''
            }
        case 'Rock':
            return {
                cardBg: 'RockBgCard',
                pill: 'RockBgPill',
                pageBg: ''
            }
        case 'Bug':
            return {
                cardBg: 'BugBgCard',
                pill: 'BugBgPill',
                pageBg: ''
            }
        case 'Ghost':
            return {
                cardBg: 'GhostBgCard',
                pill: 'GhostBgPill',
                pageBg: ''
            }
        case 'Steel':
            return {
                cardBg: 'SteelBgCard',
                pill: 'SteelBgPill',
                pageBg: ''
            }
        case 'Fire':
            return {
                cardBg: 'FireBgCard',
                pill: 'FireBgPill',
                pageBg: ''
            }
        case 'Water':
            return {
                cardBg: 'WaterBgCard',
                pill: 'WaterBgPill',
                pageBg: ''
            }
        case 'Grass':
            return {
                cardBg: 'GrassBgCard',
                pill: 'GrassBgPill',
                pageBg: ''
            }
        case 'Electric':
            return {
                cardBg: 'ElectricBgCard',
                pill: 'ElectricBgPill',
                pageBg: ''
            }
        case 'Psychic':
            return {
                cardBg: 'PsychicBgCard',
                pill: 'PsychicBgPill',
                pageBg: ''
            }
        case 'Ice':
            return {
                cardBg: 'IceBgCard',
                pill: 'IceBgPill',
                pageBg: ''
            }
        case 'Dragon':
            return {
                cardBg: 'DragonBgCard',
                pill: 'DragonBgPill',
                pageBg: ''
            }
        case 'Dark':
            return {
                cardBg: 'DarkBgCard',
                pill: 'DarkBgPill',
                pageBg: ''
            }
        case 'Fairy':
            return {
                cardBg: 'FairyBgCard',
                pill: 'FairyBgPill',
                pageBg: ''
            }
        case '???':
            return {
                cardBg: '',
                pill: '',
                pageBg: ''
            }
        case 'Shadow':
            return {
                cardBg: '',
                pill: '',
                pageBg: ''
            }
        default: 
            return ''
    }

}