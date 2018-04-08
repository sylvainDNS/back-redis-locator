const redis = require('redis')
const Hapi = require('hapi')

const conn = redis.createClient()

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

const initServer = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})


initServer()
