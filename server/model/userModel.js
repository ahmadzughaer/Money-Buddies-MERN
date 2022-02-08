const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const userSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        dateOfBirth: { type: Date, required: true },
        accountNumber: { type: Number},
        monthlyIncome: { type: Number},
        phoneNumber: { type: Number},
        password: { type: String, required: true },
        moneyCircles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MoneyCircle'}]
    }
)

const User = mongoose.model('User', userSchema)
 

module.exports = User

