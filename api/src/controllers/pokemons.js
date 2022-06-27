const { Pokemons, Types } = require("../db");
const axios = require("axios");
const { uuid: v4 } = require("uuidv4");
const pokes = require("../json/apiPoke.json");

const consult = async (req, res) => {
  const db = await Pokemons.findAll({
    attributes: [
      "id",
      "name",
      "img",
      "height",
      "weight",
      "attack",
      "defense",
      "hp",
    ],
    indclude: {
      model: Types,
      attributes: ["id"],
    },
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
    details = await details.map((el) => {
      return {
        id: el.data.id,
        name: el.data.name,
        hp: el.data.hp,

        speed: el.data.speed,
        height: el.data.height,
        weight: el.data.weight,
        img: el.data.sprites.other.dream_world.front_default,
        attack: el.data.stats[1].base_stat,
        defense: el.data.stats[2].base_stat,
        types: el.data.types.map((t) => {
          return { name: t.type.name };
        }),
      };
    });
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", details);
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
  const { name } = req.query;
  try {
    
 const filterPoke = await Pokemons.findAll({
  where:{ name},
   include: {
        model: Types,
        attributes: ["name"],
      },
})
    // pokes.map((poke) => {
    //   return poke.types?.map((type) => {
    //     if (type.name === name) {
    //       filterPoke.push(poke);
    //     }
    //   });
    // });
    return res.send(filterPoke);
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
