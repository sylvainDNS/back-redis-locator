const redis = require('redis')

export default (conn) => {
    const model = {
        add: async (uuid, long, lat, userName) => {
            return await conn.geoadd(uuid, 'geoloc', long, lat, userName)
        },
        getInRadius: async (long, lat, radius, unit) => {
            return await conn.georadiusbymember('geoloc', long, lat, radius, unit)
        },
    }
    return model
}
