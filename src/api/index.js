import Routes from './routes'
import Handlers from './handlers'
import Models from './models'

export default (server, conn) => {
    const handlers = Handlers(Models(conn))

    return Routes(server, handlers)
}
