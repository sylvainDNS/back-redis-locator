import Joi from 'joi'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

export const GeoListener = (server, io, client, schema) => {
    let socketList = []

    io.on('connection', socket => {
        const params = JSON.parse(socket.handshake.query.params)
        const obj = { socket: socket, uuid: params.uuid }

        socketList.push(obj)

        socket.on('disconnect', () => {
            const socketUuid = socketList.find(el => el.uuid === socketUuid)
            socketList = socketList.filter(el => el.uuid != socketUuid)
            io.emit('User disconnected.')
        })
    })

    client.sub.subscribe('mapsChannel')
    client.sub.on('message', (channel, uuid) => {
        console.log('uuid : ' + uuid)
    })

    server.route({
        method: 'POST',
        path: '/',
        options: { validate: { payload: schema } },
        handler: async (request, h) => {
            const { long, lat, username } = request.payload
            const uuid = uuidv4()

            const geoUser = {
                username: username,
                timestamp: moment().unix(),
                x: long,
                y: lat
            }

            await client.pub.geoadd('maps', long, lat, uuid)
            await client.pub.set(uuid, JSON.stringify(geoUser))
            await client.pub.publish('mapsChannel', uuid)

            return 'yep'
        }
    })
}
