const Router = require('express');
const petController = require('../controllers/pet');
// const { PetJoiSchema } = require('../schemas-validators');
const { pet } = require('../schemas');

const router = Router()

// /api/item
router
    .route('/')
    .get(petController(pet).getMany)
    // .post(petController(pet, PetJoiSchema).createOne)
    .post(petController(pet).createOne)

// /api/item/:id
router
    .route('/:id')
//   .get(bookController.getOne)
//   .put(bookController.updateOne)
    .delete(petController(pet).removeOne)

module.exports = router;