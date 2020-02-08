const User = require('../models/user.js');

const {
    success,
    error,
} = require('../helpers/response.js');

exports.new = async (req, res) => {
    try {
        let data = await User.register(req.body)
        success(res, data, 201)
    }

    catch(err) {
        error(res, err, 422)
    }
}

exports.login = async (req, res) => {
    try {
        let data = await User.login(req.body)
        success(res, data, 200)
    }

    catch(err) {
        error(res, err, 422)
    }
}