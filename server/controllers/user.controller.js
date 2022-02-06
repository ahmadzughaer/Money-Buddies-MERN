const User = require("../model/userModel");
const MoneyCircle = require("../model/moneyCircleModel");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


module.exports.createUser = async (req, res) => {
  /* register api */
  try {

    const newPassword = await bcrypt.hash(req.body.password, 8)
    console.log()
    if (req.body && req.body.email && req.body.password) {
      User.find({ email: req.body.email }, (err, data) => {
        if (data.length == 0) {

          let newUser = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            password: newPassword
          });
          newUser.save((err, newUser) => {
            if (err) {
              console.log('big error')
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {
              console.log('success')
              res.status(200).json({
                status: true,
                title: 'Registered Successfully.',
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `Email ${req.body.email} Already Exist!`,
            status: false
          });
        }

      });

    } else {
      res.status(400).json({
        errorMessage: 'All fields are required',
        status: false
      });
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  };
}

/* login api */
module.exports.login = (req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {
      User.find({ email: req.body.email }, (err, data) => {
        if (data.length > 0) {
          bcrypt.compare(req.body.password,
            data[0].password,
            function (err, valid) {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
              }
              if (!valid) {
                res.status(400).json({
                  errorMessage: 'Email or password is incorrect!',
                  status: false
                });
              } else {
                checkUserAndGenerateToken(data[0], req, res);

              }

            });

        } else {
          res.status(400).json({
            errorMessage: 'Email does not exist',
            status: false
          });
        }
      })
    } else {
      res.status(400).json({
        errorMessage: 'All fields are required',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

}

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.fullname, email: data.email, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true
      });
    }
  });


}

module.exports.createMoneyCircle = (req, res) => { 
try {
  let newMoneyCircle= new MoneyCircle({
    creator: req.params.id,
    amount: req.body.amount,
    participants: [],
    period: req.body.period,
    monthlySettlement: req.body.monthlySettlement,
    role: req.body.role
  });
  newMoneyCircle.save((err, newUser) => {
    if (err) {
      res.status(400).json({
        errorMessage: err,
        status: false
      });
    } else {
      console.log('success')
      res.status(200).json({
        status: true,
        title: 'Created Successfully.',
      });
    }
  });
}
catch {
  console.log(e)
  res.status(400).json({
    errorMessage: 'Something went wrong!',
    status: false
  });
}

}


