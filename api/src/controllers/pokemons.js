const { Pokemons, Types } = require("../db");
const axios = require("axios");
const { uuid: v4 } = require("uuidv4");
const pokes = require("../json/apiPoke.json");

const consult = async (req, res) => {
  const db = await Pokemons.findAll({
    attributes: [
      "id",
      "name",
      "speed",
      "img",
      "height",
      "weight",
      "attack",
      "defense",
      "hp",
      "types"
    ],
    
  });
  console.log("AAAA", db);
  return res.json(db);
};

const sync = async (req, res) => {
  try {
    const urlApi = await axios.get("http://pokeapi.co/api/v2/pokemon?limit=5");
    let details = await Promise.all(
      urlApi.data.results.map(async (el) => await axios(el.url))
    );
    details = details.map((el) => {
      let newPokemon = {
        id: el.data.id,
        hp: el.data.hp,
        name: el.data.name,
        speed: el.data.speed,
        height: el.data.height,
        weight: el.data.weight,
        img: el.data.sprites.other.dream_world.front_default,
        attack: el.data.stats[1].base_stat,
        defense: el.data.stats[2].base_stat,
      };
      let types = el.data.types.map((el) => el.type);
      types.map((el) => delete el.url);
      return (newPokemon = { ...newPokemon, types: types });
    });

    await Pokemons.bulkCreate(details);

    return res.json(details);
  } catch (error) {
    console.log(error);
  }
};

const getAllPokemons = async (req, res) => {
  let name = req.query.name;
  try {
    let pokemon = {};
    pokemon = await Pokemons.findOne({
      indclude: {
        model: Types,
        attributes: ["name"],
      },
    });
    if (!name) {
      const db = await Pokemons.findAll({});
      return res.json(db);
    }
  } catch (error) {
    console.log(error);
  }
};

const getBytype = async (req, res) => {
  const { types } = req.query;

  try {
 
    const filterPoke= await Pokemons.findAll({
      where:{types},
      through:  {
        attributes: [types ]
      },
    });

    // filter= filterPoke.map((e)=>e.name === e.types)

    return res.json(filterPoke);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sync,
  consult,
  getAllPokemons,
  getBytype,
};
