var express = require('express');
var router = express.Router();
var Pessoa = require('../modelos/pessoa.js');

// var carregarBase = function(callback){
// var fs = require('fs');
// fs.readFile(BANCO_ARQUIVO,callback);
// }

// var salvarTodosBase = function (array) {

//   var fs = require('fs');
//   fs.writeFile(BANCO_ARQUIVO, JSON.stringify(array), function (err) {
//     if (err) {
//       return err;
//     }

//     console.log('the file was saved!')
//   })

// }
// var salvarBase = function (hash) {
//   pessoas.push(hash)
//   salvarTodosBase(pessoas)

// }



/* GET home page. */
router.get('/', function(request, response, next) {
 
 Pessoa.todos(function(pessoas) {  
   response.render('index', {
     title: 'Node + Express',
     pessoas: pessoas
   });
  });
 });


 /* GET Alterar */
 router.post('/alterar-pessoa', function (request, response, next) {

 var pessoa = new Pessoa();
 pessoa.nome = request.body.nome;
 pessoa.sobrenome = request.body.sobrenome;
 pessoa.cpf = request.body.cpf;
 pessoa.telefone = request.body.telefone;
 pessoa.endereco = request.body.endereco;

 pessoa.salvar(function(){
           response.redirect('/');
     }, request.query.cpfalterar);

    
 });


/* GET alterar */
router.get('/alterar', function (request, response, next) {
  var dados = {};

  Pessoa.buscar(request.query.cpf,function(pessoa) {
       
    if (pessoa == null) {
      console.log("Pessoa não encontrada");

      response.render('alterar', {
        'pessoa': {}
      });
      
    } else {
      response.render('alterar', {
        'pessoa': pessoa
      });
    }
    
  })
});

router.get('/excluir', function (request, response, next) {

var pessoa = new Pessoa();
pessoa.cpf = request.query.cpf;


pessoa.excluir(function () {
  response.redirect('/');

});

});



/* GET pesquisar. */
router.get('/pesquisar', function (request, response, next) {
  
  Pessoa.buscarPorNome(request.query.nome,function(pessoas) {
     response.render('index', {
       title: 'Pesquisando em Arquivos',
       pessoas: pessoas
     });
  });

  });

   
/* estados json */
router.get('/estados.json', function (request, response, next) {

  response.send([
    {'SP': 'São Paulo'},
     {
       'PR': 'Paraná'
     },
      {
        'RS': 'Rio Grande do Sul'
      },

  ])
});

router.get('/cidades.json', function (request, response, next) {
var cidades_estados = [{
    'SP': ['São Paulo', 'ponte', 'agua prata']
  },
  {
    'PR': ['guamiranga', 'imbituva', 'prude']
  },
  {
    'RS': ['Abre campo', 'sinope', 'abaete']
  },

];

if(request.query.estado != undefined && request.query.estado != ''){
   var cidades = [];

   console.log(request.query.estado);
     for(i in cidades_estados){
       var estadoRequest = request.query.estado.toUpperCase();
       if (cidades_estados[i][estadoRequest] != undefined) {
           cidades = cidades_estados[i][estadoRequest]
            console.log("cidades", cidades)
       }
       
     }

     if(cidades == []){
       cidades = cidades_estados
     }
     response.send(cidades)
} else{
  response.send(cidades_estados)
}

});


router.post('/cadastrar-pessoa', function (request, response, next) {

var pessoa = new Pessoa();
pessoa.nome = request.body.nome;
pessoa.sobrenome = request.body.sobrenome;
pessoa.cpf = request.body.cpf;
pessoa.telefone = request.body.telefone;
pessoa.endereco = request.body.endereco;

pessoa.salvar(function () {
response.redirect('/');
});


});


//////////////////////

/* GET perfil de PESSOA. */
router.get('/link', function (request, response, next) {


  var nome = request.query.nome;
  response.redirect('/profile/' + nome)


});
router.get('/profile/:id', function (req, response) {


  Pessoa.buscarPorNome(req.params.id, function (pessoas) {
    response.render('profile', {
      title: 'Pesquisando em Arquivos',
      pessoas: pessoas
    });
  });

})



module.exports = router;
