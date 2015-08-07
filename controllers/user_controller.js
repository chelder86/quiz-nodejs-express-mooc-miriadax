// A lo cutre, sin base de datos ni formulario de registro
// Sólo dos usuarios predefinidos aquí

var users = { 
    admin: {
        id: 1,
        username: "admin",
        password: "1234"
    },
    pepe: {
        id: 2,
        username: "pepe",
        password: "5678"
    }
};

// Comprueba si hay errores; y si no, hace login
exports.autenticar = function(login, password, callback){
	if (users[login]){ // Si existe en la tabla de usuarios
		if (password === users[login].password) {
			callback(null, users[login]);
		}
		else {
			callback(new Error("Password erróneo"));
		}
	}
	else{
		callback(new Error('El usuario no existe en la tabla'));
	}

};