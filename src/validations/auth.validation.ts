import Joi from 'joi'
import { UserType } from '../types/user.type'

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one special character (!@#$%^&*())'
      }),
    phone_number: Joi.string()
      .pattern(/^628\d{8,10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number must be a string of 11-13 digits starting with 628'
      }),
    role: Joi.string().valid('USER', 'ADMIN').default('USER')
  })

  return schema.validate(payload)
}

export const createSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one special character (!@#$%^&*())'
      })
  })
  return schema.validate(payload)
}

export const refreshSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })
  return schema.validate(payload)
}
