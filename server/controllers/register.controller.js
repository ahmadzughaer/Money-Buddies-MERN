// const User = require("../model/users");
// const bcrypt = require('bcryptjs')

// module.exports.createUser = async (req, res) => {
//     // try {
//     //     // if ( req.body.fullname &&  req.body.dateOfBirth && req.body.email && req.body.password) {
//     //         User.find({ Email: req.body.email }, (err, data) => {
//     //             if (data.length == 0) {
//     //                 const NewUser =   new User({
//     //                     FullName: req.body.fullname,
//     //                     Email: req.body.email,
//     //                     DateOfBirth: req.body.dateOfBirth,
//     //                     password: req.body.password
//     //                 });
//     //                  NewUser.save((err, data) => {
//     //                     if (err) {
//     //                         res.status(400).json({
//     //                             errorMessage: err,
//     //                             status: false
//     //                         });
//     //                     } else {
//     //                         res.status(200).json({
//     //                             status: true,
//     //                             title: 'Registered Successfully.'
//     //                         });
//     //                     }
//     //                 });

//     //             } else {
//     //                 res.status(400).json({
//     //                     errorMessage: `Email ${req.body.email} Already Exist!`,
//     //                     status: false
//     //                 });
//     //             }

//     //         });

//     //     // } else {
//     //     //     res.status(400).json({
//     //     //         errorMessage: 'Add proper parameter first!',
//     //     //         status: false
//     //     //     });
//     //     // }
//     // } catch (e) {
//     //     res.status(400).json({
//     //         errorMessage: 'Something went wrong!',
//     //         status: false
//     //     });
//     // }

//     // try {
//     //     const newPassword = await bcrypt.hash(req.body.password, 8)
//     //     await User.create({
//     //         fullname: req.body.fullname,
//     //         email: req.body.email,
//     //         dateOfBirth: req.body.dateOfBirth,
//     //         password: newPassword
//     //     })
//     //     res.json({ status: 'ok' })
//     //     res.send(User)
//     // } catch (err) {
//     //     res.json({ status: 'error', error: 'Duplicate email' })
//     // }
//     User.create({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         dateOfBirth: req.body.dateOfBirth,
//         password:  req.body.password
//     })
//         .then(newUser => res.json(newUser))
//         .catch(err => res.status(400).json(err))
// };

// module.exports.getUser = (req, res) => {
//     try {
//         res.send("hello")
//     }

//     catch (e) {
//         res.status(400).json({
//             errorMessage: 'Something went wrong!',
//             status: false
//         });
//     }
// }

//     ;
