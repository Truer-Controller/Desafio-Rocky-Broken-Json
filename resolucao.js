function openBrokenJson(){

  // referencia https://api.jquery.com/jquery.getjson/
  $.getJSON("broken-database.json", function( data ) {
    return data;
  });

}

function correctName(name){

  // "a" por "æ", "c" por "¢", "o" por "ø", "b" por "ß".
  // referencia https://www.w3schools.com/jsref/jsref_replace.asp
  return name.replace('æ','a').replace('¢','c').replace('ø','o').replace('ß','b');

}

function correctPrice(price){

  // Transformando atributo price em ponto flutuante
  // referencia https://www.w3schools.com/jsref/jsref_parsefloat.asp
  return parseFloat(price);

}

function correctQuantity(quantity = null){

  // Verificando se a quantidade existe e se ela não existe é preenchido com o valor 0, caso exista ela apenas é se auto completada
  if(!quantity){
    return 0;
  }else{
   return quantity;
  }

}

function saveJsonCorrected(correctedData){

  // referencia https://www.w3schools.com/js/js_json_stringify.asp
  var json = JSON.stringify(correctedData);

  // referencia https://www.w3schools.com/nodejs/nodejs_modules.asp
  // referencia https://www.w3schools.com/nodejs/nodejs_filesystem.asp     
  var fs = require('fs');
  fs.writeFile('saida.json', json, 'utf8', callback);

}

function retornandoCategoriaOrganizada(correctedData){
  correctedData.sort(correctedData.category, correctedData.id);
  for(var i = 0; i <= correctedData.length-1; i++) {
    console.log(correctedData[i])
  }
}

function sumPorCategoria(correctedData){
  
  var categoryAtual = correctedData[0].category;
  var sum = 0;

  for(var i = 0; i <= correctedData.length-1; i++) {
    if(categoryAtual == correctedData[i].category){
      sum += correctedData[i].quantity;
    }else{
      console.log('Categoria: ' + categoryAtual + 'quantity' + sum);
      categoryAtual = correctedData[i].category;
      sum = 0;
    }
  }
}

function correctedBrokenDataBaseJson(){

  data = openBrokenJson();

  console.log(data);

  var correctedData = []; 

  for(var i = 0; i <= data.length-1; i++) {

    var newItem = {};

    newItem['id'] = data[i].id;

    newItem['name'] = correctName(data[i].name);
    
    newItem['price'] = correctPrice(data[i].price);
    
    if(!data[i].quantity){
      newItem['quantity'] = correctQuantity();
    }else{
      newItem['quantity'] = correctQuantity(data[i].quantity);
    }

    newItem['category'] = data[i].category;

    correctedData.push(newItem);
  }

  saveJsonCorrected(correctedData);  

  retornandoCategoriaOrganizada(correctedData);

  sumPorCategoria(correctedData);

}

correctedBrokenDataBaseJson();