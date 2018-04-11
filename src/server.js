import { Server } from 'hapi'
import Api from './api'
import { Observable } from 'rxjs'
const redis = require('redis')
export default function start() {

    const conn = redis.createClient()

    const server = new Server({
        host: 'localhost',
        port: 3000,
        routes: { cors: { origin: ['*'] } }
    })

    Api(server, conn)

    return Observable
        .fromPromise(server.start())
        .mapTo(server)
}
