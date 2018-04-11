import { Server } from 'hapi'
import Route from './route'

export default (server, { GeolocHandler }) => {
    server.route({
        method: 'GET',
        path: '/geoloc/{unit}/{radius}/{coord*2}',
        handler: ROute(GeolocHandler.getInRadius)
    })
    server.route({
        method: ['PUT', 'POST'],
        path: '/geoloc',
        handler: Route(GeolocHandler.add)
    })
}
