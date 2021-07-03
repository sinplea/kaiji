const bcrypt = require('bcrypt');
const


// Encryption
const saltRounds = 10;
const password = process.env.ENCRYPTION_KEY;

// 1. WALLET ACTIONS & TRANSACTIONS

export function getExistingWallet(app: bcrypt) {
    app.get('/fetch/:id/', async (req, res) => {
        // Authenticate the request
        const { id } = req.params;
        const storedId = await _fetchExistingWallet(id);

        const idMatch = await bcrypt.compare(id, storedId)
    })
}

function _fetchExistingWallet(id: string) {

}