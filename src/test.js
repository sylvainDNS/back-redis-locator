const Observable = require('rxjs').Observable
const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => {
    console.log('Error : ' + err)
})

const messageSource = Observable.create((observer) => {
    client.hvals("saisie", (err, values) => {
        observer.next(values)
        observer.error(err)
    })
})

let messageList = []
messageSource.subscribe(
    (messages) => {
        messageList = messages
        console.log(messageList)
    },
    (error) => console.log('!! Error : ' + error)
)
// console.log(messageList)

// const messageListSource = messageSource.scan(
//     (messageList, message) => messageList.concat(message)
// )
// while (true) {
//     console.log(messageList)
// }
// console.log(messageListSource)
