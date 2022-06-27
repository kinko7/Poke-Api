const { Router } = require("express"); //importo la funcion Router
const {
  getBytype,
  consult,
  getAllPokemons,
  sync
} = require("../controllers/pokemons.js");
const {
  getPokeById,
  createPoke,
  deletePoke,
  updatePoke,
} = require("../controllers/pokemon.js");
const { getTypes } = require("../controllers/types.js");
//Guardo en una const y ejecuto la funcion la instancio y la expoerto abajo
const router = Router();


router.get("/sync", sync); //Trae todos los pokes de la Api y los guarda en mi db
router.get("/consult", consult);// Chekeo si los guardo
router.get("/pokemons", getAllPokemons); //Trae los poke y busca por nombre
router.get("/types", getTypes); //Guarda en mi base de datos los tipos
router.get("/pokemon/:id", getPokeById);//Trae por Id
router.post("/pokemon", createPoke);//Crea un nuevo pokemon
router.put("/pokemon/:id", updatePoke);//Actualiza un poke
router.delete("/pokemon/:id", deletePoke);//Borra un poke
router.get("/bytype", getBytype); //trae por tipo

module.exports = router;
