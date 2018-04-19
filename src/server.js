import { Server } from 'hapi'
import { Observable } from 'rxjs'
import redis from 'redis'
import { GeoListener } from './api/geoListener'
import { GeoSchema } from './api/geoSchema'
import io from 'socket.io'
import env from 'common-env'

export default function start() {
    const config = env().getOrElseAll({
        redis: {
            host: 'localhost',
            port: 6379
        },
        hapi: {
            host: 'localhost',
            port: 4444
        }
    })

    const client = {
        pub: redis.createClient(config.redis.port, config.redis.host),
        sub: redis.createClient(config.redis.port, config.redis.host)
    }

    const server = new Server({
        host: config.hapi.host,
        port: config.hapi.port,
        routes: { cors: { origin: ['*'] } }
    })

    const ioSocket = io(server.listener, { serveClient: false })

    GeoListener(server, ioSocket, client, GeoSchema)

    return server
}
