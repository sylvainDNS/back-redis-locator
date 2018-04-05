const uuidv4 = require('uuid/v4')
const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => {
    console.log('Error : ' + err)
})

const stdin = process.openStdin();

stdin.addListener("data", function (d) {
    const uuid = uuidv4()
    console.log(uuid)
    client.hset("saisie", uuid, d.toString().trim(), redis.print)
})
