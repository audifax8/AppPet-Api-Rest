const Joi = require('joi');
const apiResponse = require('../utils/api-response');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const saltRounds = 10;

const getMany = model => async (req, res, next) => {
    try {
        const docs = await model
            // .find({ createdBy: req.user._id })
            .find()
            .lean()
            .exec()

        // res.status(200).json({ response: docs, status: true, totalItems: docs.length, errors: null })
        return res.status(200).json(apiResponse(docs, true, docs.length, null))
    } catch (e) {
        next(e);
    }
}

const createOne = (model, joiSchema) => async (req, res, next) => {
    try {
        const modelToValidate = req.body;
        const isValidSchema = Joi.validate(joiSchema, modelToValidate);
        if (isValidSchema.errors) return res.status(400).json(apiResponse(false, null, 0, isValidSchema.errors));

        const password = req.body.password;
        const guidId = uuid.v1();
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        modelToValidate.id = guidId;
        modelToValidate.password = hashedPassword;

        const user = await model.create(modelToValidate);
        console.log(user);

        return res.status(200).json(apiResponse(true, user, 1, null));
    } catch (e) {
        console.log(e);
        next(e);
    }
};

const userController = (model, joiSchema) => ({
    // removeOne: removeOne(model, Joi.objectId()),
    // updateOne: updateOne(model, joiSchema, Joi.objectId()),
    getMany: getMany(model),
    // getOne: getOne(model, Joi.objectId()),
    createOne: createOne(model, joiSchema)
})

module.exports = userController;