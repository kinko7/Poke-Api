const { Pokemons, Types } = require("../db");
const { v4: uuidv4 } = require("uuid");

const getPokeById = async (req, res) => {
  const id = req.params.id;
  if (!id || parseInt(id) < 0) res.status(404).json("Invalid Id");
  try {
    const pokemon = await Pokemons.findByPk(id, {
      include: {
        model: Types,
        attributes: ["name"],
      },
    });
    return res.json(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const createPoke = async (req, res) => {
  let { name, img, attack, defense, hp, speed, height, weight, types } =
    req.body;
  try {
    if (!name) return res.status(404).send("Invalid Name");

    name = name.toLowerCase();
    const newPokemon = await Pokemons.create({
      id: uuidv4(),
      name,
      img,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      hp,
    });
    newPokemon.addTypes(types);
    res.json(newPokemon);
  } catch (error) {
    console.log(error);
    res.send({ message: "Somethings wrong" });
  }
};

const updatePoke = async (req, res) => {
  const { id } = req.params;
  const { name, img, attack, defense, hp, speed, height, weight, types } =
    req.body;
  try {
    const poke = await Pokemons.findByPk(id);
    poke.name = name;
    poke.img = img;
    poke.hp = hp;
    poke.speed = speed;
    poke.attack = attack;
    poke.defense = defense;
    poke.height = height;
    poke.weight = weight;
    poke.types = types;
    await poke.save();

    return res.json(poke);
  } catch (error) {
    res.send({ message: "Invalid Id for update" });
  }
};
const deletePoke = async (req, res) => {
  const { id } = req.params;
  try {
    await Pokemons.destroy({
      where: {
        id:id,
      },
    });
    return res.send("DELETE");
  } catch (error) {
    next(error)
  }

}


module.exports = {
  createPoke,
  updatePoke,
  getPokeById,
  deletePoke,
};
