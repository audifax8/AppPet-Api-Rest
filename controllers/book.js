const Joi = require('joi');
const apiResponse = require('../utils/api-response');

const getMany = model => async (req, res, next) => {
    try {
        const docs = await model
            // .find({ createdBy: req.user._id })
            .find()
            .lean()
            .exec()

        // res.status(200).json({ response: docs, status: true, totalItems: docs.length, errors: null })
        res.status(200).json(apiResponse(docs, true, docs.length, null))
    } catch (e) {
        next(e);
    }
}

const createOne = (model, joiSchema) => async (req, res, next) => {
    try {
        const modelToValidate = req.body;
        const isValidSchema = Joi.validate(joiSchema, modelToValidate);
        // to validate joi
        const docCreated = await model.create(modelToValidate);
        return res.status(200).json(apiResponse(docCreated, true, docCreated.length, null))
    } catch (e) {
        next(e);
    }
}

const bookController = (model, joiSchema) => ({
    // removeOne: removeOne(model, Joi.objectId()),
    // updateOne: updateOne(model, joiSchema, Joi.objectId()),
    getMany: getMany(model),
    // getOne: getOne(model, Joi.objectId()),
    createOne: createOne(model, joiSchema)
})

module.exports = bookController;