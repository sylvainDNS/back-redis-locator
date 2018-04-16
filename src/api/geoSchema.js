import Joi from 'joi'

export const GeoSchema = () => {
    const schema = {
        long: Joi.number()
            .min(-180)
            .max(180),
        lat: Joi.number()
            .min(-90)
            .max(90),
        username: Joi.string()
            .min(3)
            .max(30)
    }
}
