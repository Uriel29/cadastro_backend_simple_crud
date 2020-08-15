var carregarEstados = function () {
     $('#estado').html('');
     $('#estado').append("<option value=''>  Selecione</option>")
  $.ajax("/estados.json")
    .done(function (dados) {
       

      for(i in dados){
       var key = Object.keys(dados[i])
       value = dados[i][key]

        $('#estado').append("<option value='" + key + "'> "+value+"</option>")
      }
      
    })

}

var carregarCidade = function () {
 var estado = $('#estado').val();
 if(estado != ''){

 $('#cidade').html('');
  $.ajax("cidades.json?estado=" + estado)
    .done(function (dados) {
      
 console.log(dados)
      for (i in dados) {
        
        var value = dados[i]

        $('#cidade').append("<option value='" + value + "'> " + value + "</option>")
      }

    })
  }

}
