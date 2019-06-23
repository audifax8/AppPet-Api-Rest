const Router = require('express');
const bookController = require('../controllers/book');
const { BookJoiSchema } = require('../schemas-validators');
const { book } = require('../schemas');

const router = Router()

// /api/item
router
    .route('/')
    .get(bookController(book).getMany)
    .post(bookController(book, BookJoiSchema).createOne)

// /api/item/:id
// router
//   .route('/:id')
//   .get(bookController.getOne)
//   .put(bookController.updateOne)
//   .delete(bookController.removeOne)

module.exports = router;
