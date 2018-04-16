import Joi from 'joi'

export const GeoListener = (server, db, schema) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { long, lat, radius, unit } = request.query

            return await db.georadiusbymember('geoloc', long, lat, radius, unit)
        }
    })

    server.route({
        method: 'POST',
        path: '/',
        handler: (request, h) => {
            const { username, long, lat } = request.payload
            Joi.validate({ long, lat, username }, schema, async (err, value) => {
                if (err) {
                    console.log(err)
                    console.log(err)
                } else {
                    return await db.geoadd('geoloc', long, lat, username)
                }
            })
        }
    })
}
