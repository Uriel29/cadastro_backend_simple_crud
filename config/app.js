mysql = require('mysql');
connectionString = 'mysql://m0vyxahy8hl0tm48:uty6e17zdgewfex0@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/d5bfktcdeaqoswal';

dbname = "d5bfktcdeaqoswal";

db = {};
db.cnn = {};
db.cnn.exec = function (query, callback) {
     var connection = mysql.createConnection(connectionString);
     connection.query(query, function (err, rows) {
         
          callback(rows, err);
          connection.end();
     });
};


var App = {
     BANCO_ARQUIVO: "dados/bancoArquivo.js",
     db: db,
     dbname: dbname
}

module.exports = App;