const usersService = require('./users.service');

exports.createUserProfile = async (req, res, next) => {
    const result = await usersService.createUserProfile(req.body);
    if(!result){
      res.status(403);
    }
    res.send();
};

exports.getUserProfile = async (req, res, next) => {
    const uid = req.params.uid;
    const result = await usersService.getUserProfile(uid);
    
    if(result){
        res.send(result);
    } else {
        res.status(403);
    }

    res.send();
};