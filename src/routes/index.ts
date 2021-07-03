/**
 * Routes/index.ts
 * Entrypoint for routing middleware. Depening on the http request
 * a connection to redis or persistent storage may be made. The lifecycle
 * of those connection are contained within the service
 * 
 */
const Transactions = require('./transactions.routes');

function configureRoutes(express: Express.Application): Express.Router {
    const router = express.Router;

    // Set custom routes here.
    Transactions(router);

    return router;
}

module.exports = {
    configureRoutes,
}