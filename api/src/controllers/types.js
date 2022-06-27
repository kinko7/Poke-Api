const { Types } = require("../db.js");
const axios = require("axios");
const { uuid: v4 } = require("uuidv4");


const getTypes = async (req, res) => {
  try {
    const dbTypes = await Types.findAll({ attributes: ["name", "id"] });
    if (dbTypes.length === 0) {
      let response = await axios.get("https://pokeapi.co/api/v2/type");
      var types = response.data.results.map((el) => {
        return { name: el.name };
      });

      Types.bulkCreate(types);
      return res.json(types);
    }

    res.json(dbTypes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTypes,
};
