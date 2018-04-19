import Joi from 'joi'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

export const GeoListener = (server, io, client, schema) => {
    let socketList = []

    io.on('connection', socket => {
        const params = JSON.parse(socket.handshake.query.params)
        const newNode = {
            socket: socket,
            username: params.username.toString(),
            radius: params.radius
        }

        socketList.push(newNode)

        socket.on('setRadius', data => {
            const node = socketList[socketList.findIndex(el => el.username === params.username)]
            socketList = socketList.filter(el => el.username != params.username)

            socketList.push(Object.assign({}, node, { radius: data.radius }))
        })

        socket.on('disconnect', () => {
            socketList = socketList.filter(el => el.username != params.username)
            io.emit('User disconnected')
        })
    })

    client.sub.subscribe('mapsChannel')
    client.sub.on('message', async (channel, username) => {
        console.log(
            'Message "' + username.toString() + '" received on channel "' + channel.toString() + '"'
        )
        await socketList.forEach(node => {
            client.pub.georadiusbymember(
                'maps',
                node.username,
                node.radius,
                'km',
                async (err, reply) => {
                    if (!err) {
                        if ((await reply.indexOf(username.toString())) > -1) {
                            client.pub.geopos('maps', username.toString(), async (err, reply) => {
                                await node.socket.emit('addGeo', {
                                    username: username.toString(),
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
            await client.pub.publish('mapsChannel', username)

            return 'yep'
        }
    })
}
