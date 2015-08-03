
var path = require('path');


console.log('Killo alguien llama a models.js o no');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Descompone la URL a la BBDD en variables
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;


var sequelize = new Sequelize( DB_name, user, pwd,
    { 
      dialect: protocol,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage,
      omitNull: true
    } 
    );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de tablas Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB (crea quiz.sqlite)
sequelize.sync().success(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0) { // la tabla se inicializa sólo si está vacía
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma',
				tema: 'Humanidades'
			})
			.success(function(){console.log('Base de datos inicializada. Italia dentro')});
			Quiz.create({
				pregunta: 'Capital de Polonia',
				respuesta: 'Varsovia',
				tema: 'Humanidades'
			})
			.success(function(){console.log('Base de datos inicializada. Polonia dentro')});
		};
	});
});



