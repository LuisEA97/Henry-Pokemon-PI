const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getPokemons,
    findPokeById,
    getPokemonTypes,
    createPokemon,
    getLocalPokemons,
    createType
} = require('./controller')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons)
router.get('/pokemons/local', getLocalPokemons)
router.get('/pokemons/:id', findPokeById)
router.get('/types', getPokemonTypes)
router.post('/pokemons', createPokemon)
router.post('/newtype', createType)
module.exports = router;
