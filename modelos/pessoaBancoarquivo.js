var App = require('../config/app.js');

var Pessoa = function () {
     this.nome = '';
     this.sobrenome = '';
     this.cpf = '';
     this.telefone = '';
     this.endereco = '';

     this.salvar = function (callback, cpfAlteracao) {
          var nomeInstacia = this.nome;
          var sobrenomeInstacia = this.sobrenome;
          var cpfInstacia = this.cpf;
          var telefoneInstacia = this.telefone;
          var enderecoInstacia = this.endereco;

          Pessoa.todos(function (pessoas) {

               if (pessoas == []) {
                    console.log('Pessoa não encontrada');

                    callback.call();
               } else {
                    if (cpfAlteracao == undefined) {
                         var hash = {
                              nome: nomeInstacia,
                              sobrenome: sobrenomeInstacia,
                              cpf: cpfInstacia,
                              telefone: telefoneInstacia,
                              endereco: enderecoInstacia
                         }
                         pessoas.push(hash);
                         Pessoa.salvarTodos(pessoas);

                    } else {
                         for (i in pessoas) {
                              if (pessoas[i].cpf == cpfAlteracao) {
                                   pessoas[i].nome = nomeInstacia;
                                   pessoas[i].sobrenome = sobrenomeInstacia;
                                   pessoas[i].cpf = cpfInstacia;
                                   pessoas[i].telefone = telefoneInstacia;
                                   pessoas[i].endereco = enderecoInstacia;
                                   Pessoa.salvarTodos(pessoas);
                                   break;
                              }
                         }
                    }
                    callback.call();

               }

          })

     }

     this.excluir = function (callback) {
          var cpfInstancia = this.cpf;
          Pessoa.todos(function (pessoas) {
               if (pessoas == []) {
                    console.log('Pessoas não encontrada');
               } else {
                    var pessoasRestantes = []
                    for (i in pessoas) {
                         if (pessoas[i].cpf != cpfInstancia) {
                              pessoasRestantes.push(pessoas[i])
                         }
                    }
                    Pessoa.salvarTodos(pessoasRestantes)
                    pessoas = pessoasRestantes;
               }
               callback.call(null, pessoas);
          })
     }
}

Pessoa.buscar = function (cpf, callback) {
     Pessoa.todos(function (pessoas) {

          if (pessoas == []) {
               console.log("Pessoa não encontrada em nossa base de dados");
               callback.call(null, null)


          } else {

               var pessoa = null;
               for (i in pessoas) {
                    if (pessoas[i].cpf == cpf) {
                         pessoa = pessoas[i];

                         break;

                    }

               }

               callback.call(null, pessoa)
          }

     })
}


Pessoa.buscarPorNome = function (nome, callback) {
     Pessoa.todos(function (pessoas) {

          if (pessoas == []) {
               console.log("Pessoa não encontrada em nossa base de dados");
               callback.call(null, pessoas)


          } else {
               var dadosPesquisados = [];

               if (nome == '') {
                    dadosPesquisados = pessoas;

               } else {
                    for (i in pessoas) {

                         var reg = new RegExp(nome, 'i')
                         if (pessoas[i].nome.match(reg) !== null) {
                              dadosPesquisados.push(pessoas[i]);

                         }
                    }


               }
               callback.call(null, dadosPesquisados)

          }

     })
}




Pessoa.salvarTodos = function (pessoas) {
     var fs = require('fs');
     fs.writeFile(App.BANCO_ARQUIVO, JSON.stringify(pessoas), function (err) {
          if (err) {
               return err;
          }

          console.log('the file was saved!')
     });
}

Pessoa.todos = function (callback) {
     var fs = require('fs');
     fs.readFile(App.BANCO_ARQUIVO, function (err, data) {
          var pessoas = [];
          if (err) {
               console.log(err);
          } else {
               pessoas = JSON.parse(data);
          }

          callback.call(null, pessoas)
     });

}

module.exports = Pessoa;