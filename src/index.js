const uuidv4 = require('uuid/v4')
const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => {
    console.log('Error : ' + err)
})

const stdin = process.openStdin();

stdin.addListener("data", function (d) {
    client.hset("saisie", uuidv4(), d.toString().trim(), redis.print)
})
