const usersService = require('./users.service');

//Explain method here
exports.getUser = async (req, res, next) => {
    const user = usersService.getUser();
    res.send(user);
};