const axios = require('axios');
const api = axios.default;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Pokemon, Types} = require('../db.js')

let pokemons = []
const limit = 40;
/* https://pokeapi.co/api/v2/pokemon?limit=${limit} */

async function getPokemons(req, res){
  let { name } = req.query

  if(name){
    name = name.trim().replace("%20", " ")
    let localResult = [];
    let apiResult = [];
    const findPoke = await Pokemon.findAll({
      where: {
        name: name
      },
      include: [{
        model: Types,
        attributes: ['en', 'es'],
        through: {attributes: []}
      }]
    })

    await Promise.all(findPoke).then(data => {
      localResult = data
    })

    try {
      const pokedata = await api.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    
      for(let i=0; i<pokedata.data.types.length; i++){
        let en, es = ''
        let url = pokedata.data.types[i].type.url;

        await api.get(url)
        .then(response => {
          const langES = response.data.names.find(name => name.language.name === 'es')
          const langEN = response.data.names.find(name => name.language.name === 'en')
          en = langEN.name;
          es = langES.name;

          pokedata.data.types[i] = {
            en,
            es
          }
        })
      }
      /*Creating specimen of this pokemon... */
      let specimen = {
        id: pokedata.data.id,
        name: pokedata.data.name,
        img: pokedata.data.sprites.other['official-artwork']['front_default'],
        weight: pokedata.data.weight,
        height: pokedata.data.height,
        types: pokedata.data.types
      }

      /* set stat_name: value in specimen*/
      for(let i = 0; i < pokedata.data.stats.length; i++){
        let name = pokedata.data.stats[i].stat.name
        name = name.replace('-', '_')
        /*Saving value of the stat as 'base'*/
        let base = pokedata.data.stats[i]["base_stat"]

        specimen[name] = base
      }

      apiResult.push(specimen)
    } catch (error) {
      console.log(error.message)
      apiResult = []
    }

    if(apiResult.length === 0 && localResult.length === 0) return res.status(404).json({
      en: 'We couldnt capture this pokemon!',
      es: '¡No pudimos capturar ese pokemón!'
    })
    res.status(200).json([apiResult, localResult])

  } else {
    try {
      let localPokemons = [];
      const localPokes = await Pokemon.findAll({
        attributes: ['id', 'name', 'img', 'attack'],
        include: [{
          model: Types,
          attributes: ['en', 'es'],
          through: {attributes: []}
        }]
      })
      
      await Promise.all(localPokes)
      .then(data => {
        localPokemons = data
      })

      if(pokemons.length > 0 && pokemons.length === limit) return res.status(200).json([pokemons, localPokemons])

      const search = await api.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      const pokes = search.data

      pokemons = []

      for(let i = 0; i < pokes.results.length; i++){
        const pokemon = pokes.results[i]
        let pos = i + 1

        console.log('pokemon ' + pos + ' of ' + pokes.results.length + ':')
        console.log('fetching info for ',pokemon.name)
        console.log('--------------------------------------')

        const pokedata = await api.get(pokemon.url)

        /*Get pokemon types both in english and spanish*/
        for(let i=0; i<pokedata.data.types.length; i++){
          let en, es = ''
          let url = pokedata.data.types[i].type.url;
          base = pokedata.data.types[i]["base_stat"]
          await api.get(url)
          .then(response => {
            const langES = response.data.names.find(name => name.language.name === 'es')
            const langEN = response.data.names.find(name => name.language.name === 'en')
            en = langEN.name;
            es = langES.name;

            pokedata.data.types[i] = {
              en,
              es
            }
          })
        }

        let specimen = {
          id: pokedata.data.id,
          name: pokedata.data.name,
          img: pokedata.data.sprites.other['official-artwork']['front_default'],
          types: pokedata.data.types,
          attack: pokedata.data.stats[1].base_stat
        }
        pokemons.push(specimen)
      }

      res.status(200).json([pokemons, localPokemons])
    } catch (error) {
      console.log(error)
      res.status(400).json({
        en: 'Oops!, something failed around here',
        es: '¡Oops!, Algo falló por aquí'
      })
    }
  }
    
}

async function findPokeById(req, res){
  const { id } = req.params;

  if(!id) return res.sendStatus(400);
  // Regular expression to check if string is a valid UUID
  const checkid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUUID = checkid.test(String(id))

  try {
    if(isUUID){

      const findPokeId = await Pokemon.findByPk(id, {
        include: [{
        model: Types,
        attributes: ['en', 'es'],
        through: {attributes: []}
        }]
      })
      if(!findPokeId) return res.status(404).json({
        en: 'We couldnt find your pokemon',
        es: 'No pudimos encontrar tu pokemón'
      })

      return res.status(200).json(findPokeId)

    } else {
      const pokeIndex = pokemons.findIndex(poke => poke.id === id)
      const find = await api.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      let data = find.data;
      
      let pokemon = {
        id: data.id,
        name: data.name,
        img: data.sprites.other['official-artwork']['front_default'],
        weight: data.weight,
        height: data.height
      }

      /* find stats name in both english and spanish */
      for(let i = 0; i < data.stats.length; i++){
        let name = data.stats[i].stat.name;
        name = name.replace('-', '_')
        let base = data.stats[i]["base_stat"]
        pokemon[name] = base
      }

      if(pokeIndex === -1){
        for(let i=0; i<data.types.length; i++){
          let en, es = ''
          let url = data.types[i].type.url;

          await api.get(url)
          .then(response => {
            const langES = response.data.names.find(name => name.language.name === 'es')
            const langEN = response.data.names.find(name => name.language.name === 'en')
            en = langEN.name;
            es = langES.name;

            data.types[i] = {
              en,
              es
            }
          })
        }
        pokemon = {
          ...pokemon,
          types: data.types
        }
      } else {
        pokemon = {
          ...pokemon,
          types: pokemons[pokeIndex].types
        }
      }
      res.status(200).json(pokemon)
    }
  } catch (error) {
    console.log(error.message)
    res.status(404).json({
        en: 'We couldnt find your pokemon',
        es: 'No pudimos encontrar tu pokemón'
      })
  }
}

async function getPokemonTypes(req, res){
  try {
    let resultsOnDB = []
    const localTypes = await Types.findAll()

    await Promise.all(localTypes)
      .then(data => {
        resultsOnDB = data
      })

    if(resultsOnDB.length>0){

      console.log('showing local types')
      return res.status(200).json(resultsOnDB)

    } else {
      console.log('fetching types from pokeApi')
      const types = []
      const pokeTypes = await api.get('https://pokeapi.co/api/v2/type')
      const data = pokeTypes.data
      
      let en, es = '';

      for(let i=0; i<data.results.length; i++){
        const url = data.results[i].url
        let tipo;
        await api.get(url)
        .then(response => {
          let data = response.data
          let id = i+1

          let langEN = data.names.find(name => name.language.name === 'en')
          let langES = data.names.find(name => name.language.name === 'es')
          en = langEN.name

          if(langES){
            es = langES.name
          } else {
            es = en
          }

          tipo = {
            id,
            en,
            es
          }
        })
        console.log(tipo)
        const creado = await Types.findOrCreate({where: {
          id: tipo.id,
          en: tipo.en,
          es: tipo.es
        }})
        types.push(creado[0])
      }
      
      res.status(200).json(types)
    }

  } catch (error) {
    console.log(error)
    return res.status(400).send(error.message)
  }
}

async function createPokemon(req, res){
  try {
    const {
      name,
      img,
      weight,
      height,
      hp,
      attack,
      defense,
      special_attack,
      special_defense,
      speed,
      types
    } = req.body
  
    const pokeCreated = await Pokemon.create({
      name,
      img,
      weight: parseInt(weight),
      height: parseInt(height),
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
      special_attack: parseInt(special_attack),
      special_defense: parseInt(special_defense),
      speed: parseInt(speed)
    })
    await pokeCreated.setTypes(types)
    const id = pokeCreated.id

    const result = await Pokemon.findByPk(id, {
      include: [{
      model: Types,
      attributes: ['en', 'es'],
      through: {attributes: []}
      }]
    })

    res.status(200).json(result)

  } catch (error) {
    console.log(error)
    res.status(400).json({
      en: 'an error has ocurred while creating your pokemon', 
      es: 'ha ocurrido un error mientras se creaba tu pokemon'
    })
  }

}

async function getLocalPokemons(req, res){
  try {
    let results = [];
    const localPokes = await Pokemon.findAll({
      attributes: ['id', 'name', 'img'],
      include: [{
        model: Types,
        attributes: ['en', 'es'],
        through: {attributes: []}
      }]
    })
    
    await Promise.all(localPokes)
    .then(data => {
      results = data
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(400).json({
      en: 'Oops!, something failed around here',
      es: '¡Oops!, Algo falló por aquí'
    })
  }
}

module.exports ={
    getPokemons,
    findPokeById,
    getPokemonTypes,
    createPokemon,
    getLocalPokemons
}