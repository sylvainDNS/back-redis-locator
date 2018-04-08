import { Server } from 'hapi'
import Route from './route'

export default (server, { GeolocHandler }) => {
    server.route({
        method: ['PUT', 'POST'],
        path: '/geoloc',
        handler: Route(GeolocHandler.check)
    })
}
