const mongoose = require('mongoose')
const config = require('../config.js');

const Schema = mongoose.Schema;

let PurchaseSchema = new Schema({
    'cpf': {
        type: String,
        required: true,
    },
    'code': {
        type: String,
        required: true,
    }, 
    'value': {
        type: Number,
        required: true,
    },
    'date': {
        type: Date,
        required: true,
    },
    'status': {
        type: String,
        enum: ['APPROVED', 'ON_APPROVAL'],
        default: 'ON_APPROVAL'
    }
},{
    timestamps: true
});

PurchaseSchema.pre('save', async function (next) {
    const purchase = this;
    if(config.alwaysApprovedCPFs.includes(purchase.cpf))
        purchase.status = 'APPROVED';
    next();
})

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;