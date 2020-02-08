const Quiz = require('../models/quiz.js');
const Question = require('../models/question.js');

const {
    success,
    error,
} = require('../helpers/response.js');

exports.newQuiz = async (req, res) => {
    try {
        let params = {
            title: req.body.title,
            owner: req.user._id,
        }
        let data = await Quiz.create(params)
        success(res, data, 201)
    }

    catch(err) {
        error(res, err, 422)
    }
}

exports.addQuestion = async (req, res) => {
    try {
        let quiz = await Quiz.findById(req.query);
        let data = await Question.create(req.body);

        quiz.questions.push(data)
        await quiz.save();
        
        success(res, quiz, 201)
    }

    catch(err) {
        error(res, err, 422)
    }
}

exports.viewQuiz = async (req, res) => {
    try {
        let data = await Quiz.find({owner: req.user._id})
        .select(['-owner'])
        .populate({
            path: 'questions',
            select: ['question', 'options']
        })
        success(res, data, 200)
    }

    catch(err) {
        error(res, err, 400)
    }
}
