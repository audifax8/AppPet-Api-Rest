const Router = require('express');
const router = Router();
const loginController = require('../controllers/auth');
const { LoginJoiSchema } = require('../schemas-validators');

// /api/
router
    .route('/')
    .post(loginController(LoginJoiSchema).login)

module.exports = router;