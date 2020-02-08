const Question = require('../models/question.js');

const {
    success,
    error,
} = require('../helpers/response.js');

exports.create = async (req, res) => {
    try {
        let data = await Question.make(req.body)
        success(res, data, 201)
    }

    catch(err) {
        error(res, err, 422)
    }
}
