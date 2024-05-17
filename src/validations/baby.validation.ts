import Joi from 'joi'
import BabyType from '../types/baby.type'

export const createBabyValidation = (payload: BabyType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string().required(),
    birthdate: Joi.date().required(),
    parent_name: Joi.string().required(),
    address: Joi.string().allow('', null),
    phone_number: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}
