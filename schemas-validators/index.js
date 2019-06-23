const Joi = require('joi');

const LoginJoiSchema = Joi.object().keys({
    userName: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).max(100).required(),
});

const UserJoiSchema = Joi.object().keys({
    id: Joi.string().min(3).max(100).required(),
    userName: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).max(100).required(),
    isAdmin: Joi.boolean().default(false),
});

const BookJoiSchema = Joi.object().keys({
    name: Joi.string().min(3).max(100).required(),
    author: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required(),
    title: Joi.string().min(3).max(100).required(),
});

module.exports = { LoginJoiSchema, UserJoiSchema, BookJoiSchema };