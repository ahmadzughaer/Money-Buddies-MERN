const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moneyCircleSchema = new Schema(
    {
        creator:{ type: String },
        amount: { type: Number, required: true },
        participants: [{ type: mongoose.Types.ObjectId, ref: 'User'}],
        period: { type: Number, required: true },
        monthlySettlement:  { type: Number, required: true },
        role:  { type: Number, required: true, unique: true},
    }
)

const MoneyCircle = mongoose.model('MoneyCircle', moneyCircleSchema)
module.exports = MoneyCircle

