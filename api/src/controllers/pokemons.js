const { Pokemons, Types } = require("../db");
const axios = require("axios");
const { uuid: v4 } = require("uuidv4");


const consult = async (req, res) => {
   const db = await Pokemons.findAll({
  
  });

  if(db.length <= 0) return res.send("no data")
  console.log("AAAA", db);
  return res.json(db);
};


const getApiInfo = async (req,res) => {
  
  const urlApi = await axios.get("http://pokeapi.co/api/v2/pokemon?limit=5");
    let details = await Promise.all(
      urlApi.data.results.map(async (el) => await axios(el.url))
    );
    details = await details.map((el) => {
    return {
      id: el.data.id,
      name: el.data.name,
      hp:el.data.hp,
      defense: el.data.stats[2].base_stat,
      speed: el.data.stats[5].base_stat,
      height: el.data.height,
      weight: el.data.weight,
      image: el.data.sprites.other.dream_world.front_default,
      types: el.data.types.map((el) => {
        return {
          name: el.type.name,
        };
      }),
    };
  });
  console.log(details)

  return details
}
 


const getDbInfo = async (req,res) => {
const infoDb= await Pokemons.findAll({
    include: {
      model: Types,
      attributes: ["name"],
    },
  });

  return infoDb
};

const getAllPokemons = async (req,res) => {
  const {name} = req.query
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = await apiInfo.concat(dbInfo);
  
 
  if (name) {
    let pokemonName = await infoTotal.filter(
      (el) => el.name.toLowerCase() === name.toLocaleLowerCase()
    );
    
    return res.json(pokemonName)
    
    }else{ 
 
  return  res.json(infoTotal)

  }
}
  

const sync= async(req,res)=> {

  try {
    const pokemonInfoTotal = await getAllPokemons();
  
      return await Pokemons.bulkCreate(pokemonInfoTotal)
 
  } catch (error) {
    console.log(error)
  }

}
 

const getBytype = async (req, res) => {
  const { types } = req.query;

  try {
     const filterPoke= await Pokemons.findAll({
      where:{types},
      through:  {
        attributes: [types ]
      },
    });

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
