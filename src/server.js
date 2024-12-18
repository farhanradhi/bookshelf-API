const hapi = require('@hapi/hapi');
const routes = require('./booksroutes');

const init = async () => {
    const server = hapi.server({
        port : 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    server.route(routes);
    await server.start();
    console.log(`server sedang berjalan di http://localhost:${server.settings.port}`);
};

init();
    