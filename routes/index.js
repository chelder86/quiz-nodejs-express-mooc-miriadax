var express = require('express');
var router = express.Router();

//@ch
var quizController = require('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz MiriadaX' });
});

// @ch Rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create); // crea sesión
router.get('/logout', sessionController.destroy);

router.get('/quizes/question', sessionController.loginRequired, quizController.question);

// TODO tal y como está sólo vale para una pregunta
// Falta un: /quizes/:quizId(\\d+)/answer
router.get('/quizes/answer', sessionController.loginRequired, quizController.answer);

// console.log('antes de /quizes/search');
// router.get('/quizes/?search', quizController.search);
// console.log('después de /quizes/:search');

router.get('/quizes/', sessionController.loginRequired, quizController.quiz);

router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

module.exports = router;

// Authors page
router.get('/author', sessionController.loginRequired, function(req, res) {
	res.render('author');
});

