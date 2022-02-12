const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moneyCircleSchema = new Schema(
    {
        creator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        amount: { type: Number, required: true },
        participants: { type: [mongoose.Schema.Types.ObjectId], ref: 'User'},
        period: { type: Number, required: true },
        monthlySettlement:  { type: Number, required: true },
        role:  { type: Number, required: true},
        remainingPlaces: []
    }
)

const MoneyCircle = mongoose.model('MoneyCircle', moneyCircleSchema)
module.exports = MoneyCircle

