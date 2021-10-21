export const pokemonTypeClass = (pokeType) => {
    switch(pokeType){
        case 'Normal':
            return {
                cardBg: 'NormalBgCard',
                pill: 'NormalBgPill',
                pageBg: 'NormalPageBg',
                fillNav: '#c0703b'
            }
        case 'Fighting':
            return {
                cardBg: 'FightingBgCard',
                pill: 'FightingBgPill',
                pageBg: 'FightingPageBg',
                fillNav: '#e45b56'
            }
        case 'Flying':
            return {
                cardBg: 'FlyingBgCard',
                pill: 'FlyingBgPill',
                pageBg: 'FlyingPageBg',
                fillNav: '#9db6d3'
            }
        case 'Poison':
            return {
                cardBg: 'PoisonBgCard',
                pill: 'PoisonBgPill',
                pageBg: 'PoisonPageBg',
                fillNav: '#4b4892'
            }
        case 'Ground':
            return {
                cardBg: 'GroundBgCard',
                pill: 'GroundBgPill',
                pageBg: 'GroundPageBg',
                fillNav: '#614f28'
            }
        case 'Rock':
            return {
                cardBg: 'RockBgCard',
                pill: 'RockBgPill',
                pageBg: 'RockPageBg',
                fillNav: '#35311c'
            }
        case 'Bug':
            return {
                cardBg: 'BugBgCard',
                pill: 'BugBgPill',
                pageBg: 'BugPageBg',
                fillNav: '#615728'
            }
        case 'Ghost':
            return {
                cardBg: 'GhostBgCard',
                pill: 'GhostBgPill',
                pageBg: 'GhostPageBg',
                fillNav: '#372f70'
            }
        case 'Steel':
            return {
                cardBg: 'SteelBgCard',
                pill: 'SteelBgPill',
                pageBg: 'SteelPageBg',
                fillNav: '#dee0e0'
            }
        case 'Fire':
            return {
                cardBg: 'FireBgCard',
                pill: 'FireBgPill',
                pageBg: 'FirePageBg',
                fillNav: '#b1571b'
            }
        case 'Water':
            return {
                cardBg: 'WaterBgCard',
                pill: 'WaterBgPill',
                pageBg: 'WaterPageBg',
                fillNav: '#354c99'
            }
        case 'Grass':
            return {
                cardBg: 'GrassBgCard',
                pill: 'GrassBgPill',
                pageBg: 'GrassPageBg',
                fillNav: '#286e55'
            }
        case 'Electric':
            return {
                cardBg: 'ElectricBgCard',
                pill: 'ElectricBgPill',
                pageBg: 'ElectricPageBg',
                fillNav: '#d8b73f'
            }
        case 'Psychic':
            return {
                cardBg: 'PsychicBgCard',
                pill: 'PsychicBgPill',
                pageBg: 'PsychicPageBg',
                fillNav: '#784fb6'
            }
        case 'Ice':
            return {
                cardBg: 'IceBgCard',
                pill: 'IceBgPill',
                pageBg: 'IcePageBg',
                fillNav: '#cbddf0'
            }
        case 'Dragon':
            return {
                cardBg: 'DragonBgCard',
                pill: 'DragonBgPill',
                pageBg: 'DragonPageBg',
                fillNav: '#97341b'
            }
        case 'Dark':
            return {
                cardBg: 'DarkBgCard',
                pill: 'DarkBgPill',
                pageBg: 'DarkPageBg',
                fillNav: '#080b14'
            }
        case 'Fairy':
            return {
                cardBg: 'FairyBgCard',
                pill: 'FairyBgPill',
                pageBg: 'FairyPageBg',
                fillNav: '#c5457f'
            }
        case '???':
            return {
                cardBg: '',
                pill: '',
                pageBg: ''
            }
        case 'Shadow':
            return {
                cardBg: 'DarkBgCard',
                pill: 'DarkBgPill',
                pageBg: 'ShadowPageBg',
                fillNav: '#111524'
            }
        default: 
            return ''
    }

}