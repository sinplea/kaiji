const { ObjectId } = require('mongoose/Types');
const Account = require('../../models/Account.model');

module.exports = {
    find(label: String) {
        return new Promise((res, rej) => {
            try {
                const account = await Account.find(label).exec();
                res(account.toObject());
            } catch (err) {
                rej(err)
            }
        })
    },
    create(payload) {
        return new Promise((res, rej) => {
            try {
                const data = { ...payload };
                data._id = ObjectId();

                const account = new Account(data);
                const saved = await account.save();
                res(saved.toObject());
            } catch (err) {
                rej(err);
            }
        })
    },
    update(id, update) {
        return new Promise(async (res, rej) => {
            try {
                const account = await Account.findByIdAndUpdate(id, update, { new: true })
                    .exec();

                res(account.toObject());
            } catch (err) {
                rej(err);
            }
        });
    }
}