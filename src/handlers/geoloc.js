const uuidv4 = require('uuid/v4')

export default ({ GeolocModel }) => {
    const handler = {
        getInRadius: async (request, h) => {
            const { long }, { lat }, { radius }, { unit } = request.params
            const coord = request.params.coord.split('/')

            return await GeolocModel.getInRadius(coord[0], coord[1], radius, unit)
        },
        add: async (request, h) => {
            const { username }, { latitude }, { longitude } = request.payload
            return await GeolocModel.add(uuidv4(), longitude, latitude, username)
        }

    }
}
