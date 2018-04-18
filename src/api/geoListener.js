import Joi from 'joi'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

export const GeoListener = (server, io, client, schema) => {
    let socketList = []

    io.on('connection', socket => {
        const params = JSON.parse(socket.handshake.query.params)
        const newNode = { socket: socket, uuid: params.uuid.toString(), radius: params.radius }

        socketList.push(newNode)

        socket.on('setUuid', data => {
            const node = socketList[socketList.findIndex(el => el.uuid === params.uuid)]
            socketList = socketList.filter(el => el.uuid != params.uuid)

            node.uuid = data.uuid
            params.uuid = data.uuid
            socketList.push(node)
        })

        socket.on('setRadius', data => {
            const node = socketList[socketList.findIndex(el => el.uuid === params.uuid)]
            socketList = socketList.filter(el => el.uuid != params.uuid)

            node.radius = data.radius
            socketList.push(node)
        })

        socket.on('disconnect', () => {
            const socketUuid = socketList.find(el => el.uuid === params.uuid)
            socketList = socketList.filter(el => el.uuid != socketUuid)
            io.emit('User disconnected')
        })
    })

    client.sub.subscribe('mapsChannel')
    client.sub.on('message', async (channel, uuid) => {
        await socketList.forEach(node => {
            client.pub.georadiusbymember(
                'maps',
                node.uuid,
                node.radius,
                'km',
                async (err, reply) => {
                    if (!err) {
                        if ((await reply.indexOf(uuid.toString())) > -1) {
                            client.pub.geopos('maps', uuid.toString(), async (err, reply) => {
                                await node.socket.emit('addGeo', {
                                    uuid: uuid.toString(),
                                    long: reply[0][0],
                                    lat: reply[0][1]
                                })
                            })
                        }
                    }
                }
            )
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
