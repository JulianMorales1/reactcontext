

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')

const userSc = new mongoose.Schema({
    email: String,
    password: String
})


userSc.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, 'xyzabc789', {
        expiresIn: '30000'
    })
};




module.exports = mongoose.model('User', userSc);

