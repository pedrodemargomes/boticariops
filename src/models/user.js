const mongoose = require('mongoose')
const validator = require('validator');
const { cpf } = require('cpf-cnpj-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config.js');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    'username': {
        type: String,
        required: true,
        unique: true
    },
    'email': {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if(!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'});
            }
        }
    },
    'cpf': {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if(!cpf.isValid(value)) {
                throw new Error({error: 'Invalid CPF'});
            }
        }
    },
    'password': {
        type: String,
        required: true,
        minlength: 6
    },
    'tokens': [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8);
    next();
})

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id, createdAt: Date.now()}, config.jwt.key, {
        expiresIn: config.jwt.expireTime
    });
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email} );
    if (!user)
        throw new Error({ error: 'Invalid login credentials' });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
        throw new Error({ error: 'Invalid login credentials' });
    
    return user;
}


const User = mongoose.model('User', UserSchema);

module.exports = User;