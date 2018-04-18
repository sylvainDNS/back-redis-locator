import Joi from 'joi'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

export const GeoListener = (server, io, client, schema) => {
    let socketList = []

    io.on('connection', socket => {
        const params = JSON.parse(socket.handshake.query.params)
        const newKeyValue = { socket: socket, uuid: params.uuid.toString(), radius: params.radius }

        socketList.push(newKeyValue)

        socket.on('disconnect', () => {
            const socketUuid = socketList.find(el => el.uuid === params.uuid)
            socketList = socketList.filter(el => el.uuid != socketUuid)
            io.emit('User disconnected')
        })
    })

    client.sub.subscribe('mapsChannel')
    client.sub.on('message', (channel, uuid) => {
        socketList.forEach(keyValue => {
            client.pub.georadiusbymember(
                'maps',
                keyValue.uuid,
                keyValue.radius,
                'km',
                (err, reply) => {
                    if (!err) {
                        if (reply.indexOf(uuid.toString()) > -1) {
                            keyValue.socket.emit('addGeo', { reply: 'ye$$$$' })
                            console.log('ye$$$$$$')
                        } else {
                            keyValue.socket.emit('addGeo', { reply: 'Nop€€€€' })
                            console.log('Nop€€€€')
                        }
                    }
                }
            )
            console.log(keyValue.uuid)
        })
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
