
var models  = require('../models/models');


//@ch GET /quizes/question
exports.question = function (req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};

//@ch GET /quizes/answer
exports.answer = function (req, res){
	models.Quiz.findAll().success(function(quiz) {
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto'});
		}
		else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
};


//@ch /quizes & /quizes/?search=..
exports.quiz = function(req, res) {
	if (req.query.search == null) { //@ch I did not use a triple = 
        res.render('quizes/quiz');
	}
	else {
		models.Quiz.findAll({where: ["pregunta like ?", "%" + req.query.search + "%"]}).success(function(result) {
			res.render('quizes/search', {encontrados: result});
		});		
	};
};


