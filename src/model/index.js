import Location from '.location'

export default function (conn) {
    return {
        Location: Location(conn)
    }
}
