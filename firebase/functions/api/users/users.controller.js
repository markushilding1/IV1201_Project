const usersService = require('./users.service');
const { check, validationResult } = require('express-validator');

exports.createUserProfile = async (req, res, next) => {
    
    // Validating body params
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

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
        res.send();
    }    
};

/**
 * @author Markus Hilding
 * @description Parameter validation for all controller functions where
 * params are sent via body.
 * @param {str} method Name of controller method to validate. 
 */
exports.validate = (method) => {
    switch (method) {
        case 'createUserProfile': {
            return [ 
                check('uid', 'Parameter ´uid´ not provided').exists(),
                check('name', 'Parameter ´name´ not provided').exists(),
                check('surname', 'Parameter ´surname´ not provided').exists(),
                check('ssn', 'Parameter ´ssn´ not provided').exists(),
            ]   
        }

        case 'getUserProfile': {
            return [ 
                check('uid', 'Parameter ´uid´ not provided').exists(),
            ]   
        }
    }
}