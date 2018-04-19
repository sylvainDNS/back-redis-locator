# back-redis-locator

## COMMON-ENV

`export REDIS_HOST=`

`export REDIS_PORT=`

`export HAPI_HOST=`

`export HAPI_PORT=`

## Socket specs

### Socket handshake parameter sample :

`{"query": "params={\"username\":\"dns\", \"long\":\"50\", \"lat\":\"50\", \"radius\":\"2\"}"}`

### Listening events (client side) :

#### addGeo :

`{"username":"chat","long":"49.99999970197677612","lat":"-10.00000092823272979"}`

### Emitting events (client side) :

#### setPosition :

`{"long":"50", "lat":"60", "radius":"3"}`
