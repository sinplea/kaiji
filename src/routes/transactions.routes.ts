/**
 * transactions.routes.ts
 * Express router middleware.
 * Needs to communicate with database.
 */
import { getExistingAccount, updateAccountBalance } from '../adapters/DatabaseAdapter';


module.exports = function (router) {
    router.get('/transactions/:account_id', (req: Request, res: Response) => {
        const response = {
            body: {}
        };


        res.send(response)
    })

    router.post('/transactions/deposit/:account_id/:amount', (req, res) => {
        const { account_id, amount } = req.params;


        const response = {
            body: {}
        };
        res.send(response)
    })

    app.post('/transactions/withdraw/:account_id/:amount', (req, res) => {
        const response = {
            body: {}
        };
        res.send(response)
    })

    return router;
}