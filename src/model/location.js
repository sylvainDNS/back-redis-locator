const redis = require('redis')
const uuidv4 = require('uuid/v4')

export default (conn) => {
    const model = {
        addGeoloc: async (long, lat, userName) => {
            return await conn.geoadd(uuidv4(), 'geoloc', long, lat, userName)
        },
        getGeolocInRadius: async (long, lat, radius, unit) => {
            return await conn.georadiusbymember('geoloc', long, lat, radius, unit)
        },
    }
    return model
}
