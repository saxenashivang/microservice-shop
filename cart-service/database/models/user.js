const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    cart: [
        {
            product: {
                _id: { type: String, require: true},
                name: { type: String},
                price: { type: Number}
            },
            unit: { type: Number, require: true}
        }
    ],
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('user', UserSchema);