import { Server } from 'hapi'
import { Observable } from 'rxjs'
import redis from 'redis'
import { GeoListener } from './api/geoListener'
import { GeoSchema } from './api/geoSchema'
import io from 'socket.io'

export default function start() {
    const client = {
        pub: redis.createClient(),
        sub: redis.createClient()
    }

    const server = new Server({
        host: '127.0.0.1',
        port: 4444,
        routes: { cors: { origin: ['*'] } }
    })

    const ioSocket = io(server.listener, { serveClient: false })

    GeoListener(server, ioSocket, client, GeoSchema)

    return server
}
