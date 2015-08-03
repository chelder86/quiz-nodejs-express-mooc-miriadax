var express = require('express');
var router = express.Router();

//@ch
var quizController = require('../controllers/quiz_controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz MiriadaX' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

// console.log('antes de /quizes/search');
// router.get('/quizes/?search', quizController.search);
// console.log('después de /quizes/:search');

router.get('/quizes/', quizController.quiz);

router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

module.exports = router;

// Authors page
router.get('/author', function(req, res) {
	res.render('author');
});

