import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().required().label("Username"),
  password: Joi.string().required().min(4).max(12).label('Password'),
  confirmPassword:  Joi.string()
  .required()
  .valid(Joi.ref('password'))
  .label('Confirm Password')
  .messages({
    'any.only' : '{{#label}} does not match'
  })
}).options({ abortEarly: false });

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
}).options({abortEarly: false})