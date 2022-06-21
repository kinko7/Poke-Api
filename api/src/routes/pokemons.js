const { Router } = require('express'); //importo la funcion Router
const { getBytype, getAllPokemons } = require('../controllers/pokemons.js')
const { getPokeById, createPoke, deletePoke, updatePoke } = require('../controllers/pokemon.js')
const { getTypes } = require('../controllers/types.js')
//Guardo en una const y ejecuto la funcion la instancio y la expoerto abajo
const router = Router();


router.get('/sync', getAllPokemons);
router.get('/pokemons/types', getTypes);
router.get('/pokemon/:id', getPokeById)
router.post('/pokemon', createPoke);
router.patch('/pokemon/:id', updatePoke);
router.delete('/pokemon/:id', deletePoke)
router.get('/bytype', getBytype)




module.exports = router;
