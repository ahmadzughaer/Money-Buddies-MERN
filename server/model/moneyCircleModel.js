const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {User} = require('./userModel');

const moneyCircleSchema = new mongoose.Schema(
    {
        creator: { type: Schema.Types.ObjectId, ref: 'User'},
        amount: { type: Number, required: true },
        participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        period: { type: Number, required: true },
        monthlySettlement:  { type: Number, required: true },
        role:  { type: Number, required: true },
    }
)

const MoneyCircle = mongoose.model('MoneyCircle', moneyCircleSchema)
// const MoneyCircle = moneyCircleSchema.discriminator('MoneyCircle', mongooseUser);

module.exports = MoneyCircle

