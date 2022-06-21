const { Router } = require('express');
const { getTypes } = require('../controllers/types.js')



const router = Router();

router.get('/pokemons/types', getTypes)





module.exports = router;