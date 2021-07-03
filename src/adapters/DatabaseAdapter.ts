import { exec } from "child_process";
import { number, string } from "mathjs";
import { Account } from '../models/Account.model';

/**
 * DatabaseAdapter.ts
 * 
 * Represents a mock database call. Should be useful for testing.
 */
module.exports = class DatabaseAdapter {
    private store: Object<id> = {};

    public getExistingAccount(id: string, func?: Function): Promise {
        return new Promise((res, rej) => {
            const response: Account;

            if (!this.store.id) {
                // Error. Id not found in store
                const message = 'DatabaseAdapter.ts: Problem getting account id from local store'
                rej(new Error(message))
            } else {
                response = this.store.id;
                res(response)
            }

            if (func) {
                response = func();
            }

            res(response)
        })
    }
}