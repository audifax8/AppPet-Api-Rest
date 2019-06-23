const Router = require('express');
const router = Router();
const userController = require('../controllers/users');
const { user } = require('../schemas');
const { UserJoiSchema } = require('../schemas-validators');

// /api/
router
    .route('/')
    .get(userController(user).getMany)
    .post(userController(user, UserJoiSchema).createOne)

module.exports = router;