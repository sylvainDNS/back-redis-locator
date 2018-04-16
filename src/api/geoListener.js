
export const GeoListener = (server) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello, world!';
        }
    });
}

