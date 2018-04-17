import Joi from 'joi'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

export const GeoListener = (server, db, schema) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { long, lat, radius, unit } = request.query

            return await db.georadiusbymember('maps', '50', '50', '1', 'km')
            // return await db.georadiusbymember('maps', long, lat, radius, 'km')
        }
    })

    server.route({
        method: 'POST',
        path: '/',
        options: { validate: { payload: schema } },
        handler: async (request, h) => {
            const { long, lat, username } = request.payload
            const uuid = uuidv4()

            const geoUser = {
                username: username,
                timestamp: moment().unix(),
                x: long,
                y: lat
            }

            await db.geoadd('maps', long, lat, uuid)
            await db.set(uuid, JSON.stringify(geoUser))

            return 'yep'
        }
    })
}
