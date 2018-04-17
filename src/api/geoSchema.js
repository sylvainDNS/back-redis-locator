import Joi from 'joi'

export const GeoSchema = {
    long: Joi.number()
        .min(-180)
        .max(180)
        .required(),
    lat: Joi.number()
        .min(-90)
        .max(90)
        .required(),
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
}
