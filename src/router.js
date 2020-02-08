const express = require('express');
const router = express.Router();
const user = require('./controllers/userController.js');
const quiz = require('./controllers/quizController.js');
//const question= require('./controllers/questionController.js');
const authenticate = require('./middlewares/authenticate.js');


//User Router
router.post('/users/register', user.new);
router.post('/users/login', user.login);

//Quiz & Question Router
router.post('/quiz/new', authenticate, quiz.newQuiz);
router.post('/quiz/addquestion', authenticate, quiz.addQuestion);
router.get('/quiz/viewall', authenticate, quiz.viewQuiz);
router.get('/quiz/viewid', authenticate, quiz.viewQuizById);
router.post('/quiz/answer', authenticate, quiz.answerQuiz);

module.exports = router;