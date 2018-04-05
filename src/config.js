const redis = require('redis')
const uuidv4 = require('uuid/v4')

const client = redis.createClient()

const addGeoloc = (long, lat, userName) => {
    client.geoadd(uuidv4(), 'geoloc', long, lat, userName)
}
