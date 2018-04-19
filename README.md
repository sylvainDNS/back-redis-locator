# back-redis-locator

## COMMON-ENV

`export REDIS_HOST=`

`export REDIS_PORT=`

`export HAPI_HOST=`

`export HAPI_PORT=`

## Socket specs

### Socket handshake parameter sample :

`{"query": "params={\"uuid\":\"f65eebe2-aa4d-4fe5-80f4-0026e4cc47f7\", \"username\":\"dns\", \"long\":\"50\", \"lat\":\"50\", \"radius\":\"2\"}"}`

### Listening events (client side) :

#### addGeo :

`{"username":"chat","long":"49.99999970197677612","lat":"-10.00000092823272979"}`

### Emitting events (client side) :

#### setPosition :

`{"long":"50", "lat":"60", "radius":"3"}`
