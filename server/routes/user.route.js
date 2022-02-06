const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.post("/register", UserController.createUser);
    app.post("/login", UserController.login);
    app.post("/user/:id", UserController.createMoneyCircle);

}

