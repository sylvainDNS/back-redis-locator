# back-redis-locator

## COMMON-ENV

```bash
export REDIS_HOST=
export REDIS_PORT=

export HAPI_HOST=
export HAPI_PORT=
```

## Socket specs

### Socket handshake parameter sample :

```json
{ "query": "params={\"username\":\"dns\", \"long\":\"50\", \"lat\":\"50\", \"radius\":\"2\"}" }
```

### Listening events (client side) :

#### addGeo :

```json
{ "username": "chat", "long": "49.99999970197677612", "lat": "-10.00000092823272979" }
```

### Emitting events (client side) :

#### setPosition :

```json
{ "long": "50", "lat": "60", "radius": "3" }
```
