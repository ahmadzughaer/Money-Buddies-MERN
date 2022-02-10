const express = require('express');
const cors = require('cors');
const app = express();
require('./config/mongoose.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const User = require('./model/userModel');
const { application } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.route')(app);
// app.use("/", (req, res, next) => {
//     try {
//         if (req.path == "/login" || req.path == "/register" || req.path == "/") {
//             next();
//         } else {
//             /* decode jwt token if authorized*/
//             jwt.verify(req.headers.token, 'secret', function (err, decoded) {
//                 if (decoded && decoded.user) {
//                     req.user = decoded;
//                     next();
//                 } else {
//                     return res.status(401).json({
//                         errorMessage: 'User unauthorized!',
//                         status: false
//                     });
//                 }
//             })
//         }
//     } catch (e) {
//         res.status(400).json({
//             errorMessage: 'Something went wrong!',
//             status: false
//         });
//     }
// })



const port = 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));