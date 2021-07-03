const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const AccountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    label: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    wallet: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    balance: {
        type: Number,
        required: true,
    },
    unsettled: {
        type: Number,
        required: true,
    }
})

AccountSchema.pre('save', async function (next: Function) {
    const account = this;

    if (!account.isModified('label')) {
        return next();
    } else {
        const encryption = await _encrypt(account.label);
        account.label = encryption;
        next();
    }
})

AccountSchema.methods.comparePasswords = (label: string) => new Promise((res, rej) => {
    bcrypt.compare(label, this.label, (err, res) => {
        if (err) {
            rej(err);
        } else {
            res(res)
        }
    });
});

function _encrypt(val: String | Number): Promise<string> {
    return new Promise((res, rej) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, (saltingErr: Error, salt) => {
            if (saltingErr) {
                console.log('Error encrypting (salting) account data...')
                rej(saltingErr);
            } else {
                bcrypt.hash(val, salt, (hashingErr: Error, hash) => {
                    if (hashingErr) {
                        console.log('Error encrypting (hashing) account data...')
                        rej(hashingErr);
                    } else {
                        res(hash);
                    }
                })
            }
        })
    });


}
