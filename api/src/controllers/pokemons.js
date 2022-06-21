const { Pokemons, Types } = require("../db");
const axios = require("axios");
const { uuid: v4 } = require("uuidv4");
const pokes = require('../json/apiPoke.json')


 
const getAllPokemons = async (req, res, next) => {
  let name = req.query.name;
  try {
      if (name !== undefined && name && name !== '' ) {
          let pokemon = {};
          pokemon = await Pokemons.findOne({
              where: { name },
              indclude: {
                  model: Types,
                  attributes: ['id','name']
              }
          })
          if (pokemon) res.json(pokemon);
          else {
              const urlName = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name);
              if (urlName) {
                  pokemon = {
                      id: urlName.data.id,
                      name: urlName.data.name,
                      img: urlName.data.sprites.other.dream_world.front_default,
                      hp: urlName.data.stats[0].base_stat,
                      attack: urlName.data.stats[1].base_stat,
                      defense: urlName.data.stats[2].base_stat,
                      speed: urlName.data.stats[5].base_stat,
                      height: urlName.data.height,
                      weight: urlName.data.weight,
                  }
                  let types = urlName.data.types.map(el => el.type.name)
                  pokemon = {...pokemon, types:types}
                  return res.json(pokemon);
              }
          }
      }
      const urlApi = await axios.get('http://pokeapi.co/api/v2/pokemon?limit=20');
      const db = await Pokemons.findAll({
          attributes: ['name', 'img', 'attack', 'defense', 'id'],
          include: {
              model: Types,
              attributes: ['name']
          }
      });                //Array🔽
      let details = await Promise.all(urlApi.data.results.map(async el => await axios(el.url)));
      details = details.map(el => {
          let newPokemon = {
              id: el.data.id,
              name: el.data.name,
              img: el.data.sprites.other.dream_world.front_default,
              attack: el.data.stats[1].base_stat,
              defense: el.data.stats[2].base_stat,
          }
          let types = el.data.types.map(el => el.type);
          types.map(el => delete el.url)
          return newPokemon = {...newPokemon, types: types};
      })
      details = details.concat(db);
      return res.json(
          {
              ManyPokes: details.length, 
              pokemones: details

          })
  } catch (error) {
      console.log(error)
  }
}
const getBytype = async (req, res) => {
  const { name } = req.query
  try {

    const filterPoke = [];

    pokes.map((poke) => {
      return poke.types?.map((type) => {
        if (type.name === name) {
          filterPoke.push(poke)
        }

      });
    });
    return res.send(filterPoke)
  } catch (error) {
    console.log(error)
  }
}


module.exports = {

  getAllPokemons,
  getBytype

};
