const { Types } = require("../db.js");
const axios = require("axios");
const { uuid: v4 } = require("uuidv4");

// typeId=0
// types= [
//     { name: 'normal',
// id:typeId },   { name: 'fighting' },
//     { name: 'flying' },   { name: 'poison' },
//     { name: 'ground' },   { name: 'rock' },
//     { name: 'bug' },      { name: 'ghost' },
//     { name: 'steel' },    { name: 'fire' },
//     { name: 'water' },    { name: 'grass' },
//     { name: 'electric' }, { name: 'psychic' },
//     { name: 'ice' },      { name: 'dragon' },
//     { name: 'dark' },     { name: 'fairy' },
//     { name: 'unknown' },  { name: 'shadow' }
//   ]

const getTypes = async (req, res) => {
  try {
    const dbTypes = await Types.findAll({ attributes: ["name", "id"] });
    if (dbTypes.length === 0) {
      let res = await axios.get("https://pokeapi.co/api/v2/type");
      var types = res.data.results.map((el) => {
        return { name: el.name };
      });

      Types.bulkCreate(types);
      return res.json(types);
    }
    res.json(dbTypes);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getTypes,
};
