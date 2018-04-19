# back-redis-locator

## COMMON-ENV

`export REDIS_HOST=`

`export REDIS_PORT=`

`export HAPI_HOST=`

`export HAPI_PORT=`

## Socket specs

### Socket handshake parameter sample :

`{"query": "params={\"uuid\":\"f65eebe2-aa4d-4fe5-80f4-0026e4cc47f7\", \"username\":\"dns\", \"radius\":\"2\"}"}`

### Listening events (client side) :

#### addGeo :

`{"uuid":"1bf92864-37e5-4622-aeda-331a10ce1fac","long":"49.99999970197677612","lat":"-10.00000092823272979"}`

### Emitting events (client side) :

#### setRadius :

`{"radius":"3"}`

#### setUuid :

`{"uuid":"09fd65a1-bc60-4c49-8fe5-95df63082f1c"}`
