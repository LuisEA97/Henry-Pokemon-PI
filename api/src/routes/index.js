const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getPokemons,
    findPokeById,
    getPokemonTypes,
    createPokemon
} = require('./controller')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons)
router.get('/pokemons/:id', findPokeById)
router.get('/types', getPokemonTypes)
router.post('/pokemons', createPokemon)

module.exports = router;
