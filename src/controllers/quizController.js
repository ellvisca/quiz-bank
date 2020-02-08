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

    catch (err) {
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

    catch (err) {
        error(res, err, 422)
    }
}

exports.viewQuiz = async (req, res) => {
    try {
        let data = await Quiz.find({ owner: req.user._id })
            .select(['-owner'])
            .populate({
                path: 'questions',
                select: ['question', 'options']
            })
        success(res, data, 200)
    }

    catch (err) {
        error(res, err, 400)
    }
}

exports.viewQuizById = async (req, res) => {
    try {
        let data = await Quiz.findById({ _id: req.query.id })
            .select(['-owner', '-_id'])
            .populate({
                path: 'questions',
                select: ['question', 'options', 'answer']
            })
        console.log(data['questions'])
        console.log(data['questions'][0]['answer'])
        success(res, data, 200)
    }

    catch (err) {
        error(res, err, 400)
    }
}

exports.answerQuiz = async (req, res) => {
    try {
        let data = await Quiz.findById({ _id: req.query.id })
            .select(['-owner', '-_id'])
            .populate({
                path: 'questions',
                select: ['question', 'options', 'answer']
            })

        let score = 0;
        
        for (let i = 0; i < data['questions'].length; i++) {
            for (let j = i; i == j; j++) {
                let answerParams = req.body;
                let userAnswer = answerParams[j].answer;
                let correctAnswer = data['questions'][i]['answer'];
                console.log(userAnswer);
                console.log("Correct answer is: " + correctAnswer);
                let isCorrect = userAnswer === correctAnswer;
                if (isCorrect) score += 10;
            }
        }
        success(res, { score, of: (data['questions'].length)*10 }, 200)
    }

    catch (err) {
        error(res, err, 400)
    }
}
