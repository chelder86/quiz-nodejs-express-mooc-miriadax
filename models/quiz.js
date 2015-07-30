console.log('Killo alguien llama a quiz.js o no');


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{
			pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING
		});
}