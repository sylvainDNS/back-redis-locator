import { Server } from 'hapi'
import { Observable } from 'rxjs'
import redis from 'redis'
import { GeoListener } from './api/geoListener'
import { GeoSchema } from './api/geoSchema'

export default function start() {
    const db = redis.createClient()

    const server = new Server({
        host: '127.0.0.1',
        port: 4444,
        routes: { cors: { origin: ['*'] } }
    })
    GeoListener(server, db, GeoSchema)

    return server
}
