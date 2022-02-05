const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const User = require('./model/users')
const bcrypt = require('bcryptjs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/moneyBuddiesDB')
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));

app.post('/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 8)
        await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }

})

app.get('/register', (req, res) => {
    try {
        res.send("hello")
    }

    catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
})
const port = 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));