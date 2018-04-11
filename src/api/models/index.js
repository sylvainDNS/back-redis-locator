import Geoloc from './geoloc'

export default function (conn) {
    return {
        Geoloc: Geoloc(conn)
    }
}
