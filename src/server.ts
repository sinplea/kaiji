/**
 * Server.ts
 * Entrypoint of Kaiji
 */
require('dotenv').config();

const express = require('express');
const retry = require('retry');
const operation = retry.operation();
const app = express();
const MAIN_SERVER_PORT = process.env.MAIN_SERVER_PORT;

const { MONGO_HOST, MONGO_COLLECTION, ROOT_URI } = process.env;
const { configureRoutes } = require('./routes/index');
const { connect } = require('./services/database/index');

/**
 * start(): void
 * Configures routing middleware where connection to other services are made
 * Opens a server on specified port
 */
function start(): void {
    const router = configureRoutes(express);

    // Apply router middleware
    // Note that routes connect to adapters which is where most of the complexity occurs.
    app.use(ROOT_URI, router);

    app.listen(port, () => {
        console.log(`Kaiji listening at http://localhost:${MAIN_SERVER_PORT}`)
    })

}

start();