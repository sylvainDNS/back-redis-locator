import { Server } from 'hapi'
import { Observable } from 'rxjs'
import redis from 'redis'
import { GeoListener } from './api/geoListener'

export default function start() {

    const conn = redis.createClient()

    const server = new Server({
        host: '127.0.0.1',
        port: 3500,
        routes: { cors: { origin: ['*'] } }
    })
    GeoListener(server)

    return server
}
