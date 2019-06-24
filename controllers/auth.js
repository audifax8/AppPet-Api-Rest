const Joi = require('joi');
const apiResponse = require('../utils/api-response');
const { user } = require('../schemas');
const createToken = require('../services');
const bcrypt = require('bcrypt');

const login = joiSchema => async (req, res, next) => {
    try {
        const modelToValidate = req.body;
        const isValidSchema = Joi.validate(joiSchema, modelToValidate);
        if (isValidSchema.errors) return res.status(400).json(apiResponse(false, null, 0, isValidSchema.errors));

        const userName = modelToValidate.userName.toLowerCase();
        const password = modelToValidate.password;

        const userLoged = await user
            .findOne({ userName: userName }, (error, user) => {
                if (error) return res.status(400).json(apiResponse(false, null, 0, 'usuario o contraseña vacío'));

                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password);
                    if (!isValidPassword) return res.status(400).json(apiResponse(false, null, 0, 'Usuario o contraseña incorrectos'));
                    const token = createToken(user);
                    const userAndToken = joinUserAndToken(user, token);
                    return res.status(200).json(apiResponse(true, userAndToken, 1, null));
                }
                return res.status(400).json(apiResponse(false, null, 0, 'Usuario o contraseña incorrectos'));
            });

    } catch (e) {
        next(e);
    }
}

const loginController = (joiSchema) => ({
    login: login(joiSchema)
})

function joinUserAndToken(user, token) {
    const { _doc } = user;
    const userLogued = { token: token, userName: _doc.userName, isAdmin: _doc.isAdmin, email: _doc.email, terms: _doc.terms, id: _doc.id };
    return userLogued;
}

module.exports = loginController;