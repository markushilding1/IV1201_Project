const usersService = require('./users.service');

//Explain method here
exports.getUser = (req, res, next) => {
    usersService.getUser();
    res.send('From get user');
};