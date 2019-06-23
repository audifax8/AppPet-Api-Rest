const Joi = require('joi');
const apiResponse = require('../utils/api-response');
const uuid = require('uuid');

const createOne = (model) => async (req, res, next) => {
    try {
        const modelToValidate = JSON.parse(req.body.data);
        if (!req.files) {
            return res.status(400).json(apiResponse(null, false, 0, 'No files were uploaded.'));
        }
        if (Object.keys(req.files).length == 0) {
            return res.status(400).json(apiResponse(null, false, 0, 'No files were uploaded.'));
        }
        const guidId = uuid.v1();
        modelToValidate.id = guidId;
        let sampleFile = req.files.sampleFile;
        const fileName = `/images/${modelToValidate.id}_${modelToValidate.userId}.jpg`;
        const fileLocation = `./public/images/${modelToValidate.id}_${modelToValidate.userId}.jpg`;
        modelToValidate.imgUri = fileName;
        sampleFile.mv(fileLocation, async function(err) {
            if (err)
              return res.status(500).json(apiResponse(null, false, 0, 'Unexpected error.'));

              const docCreated = await model.create(modelToValidate);
              if (docCreated) {
                return res.status(201).json(apiResponse(docCreated, true, 1, null))
              }
        
              return res.status(400).json(apiResponse(null, false, 0, 'Unexpected error.'))
          });
        
    } catch (e) {
        next(e);
    }
}

const getMany = (model) => async (req, res, next) => {
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

const removeOne = (model) => async (req, res, next) => {
    try {
        const docId = req.params.id;
        const docDeleted = await model
            .findOneAndRemove({ _id: docId });

        if(!docDeleted) return res.status(404).json(apiResponse(null, false, 0, '404'));

        res.status(200).json(apiResponse(docDeleted, true, docDeleted.length, null))
    } catch (e) {
        next(e);
    }
} 

const petController = (model) => ({
    removeOne: removeOne(model),
    // updateOne: updateOne(model, joiSchema, Joi.objectId()),
    getMany: getMany(model),
    createOne: createOne(model)
})

module.exports = petController;