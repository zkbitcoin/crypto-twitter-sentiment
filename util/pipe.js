var pipe = [];
var maxLength = 5;

function init(size){
  maxLength = size;
}

function add(value){
  pipe.push(value);
  if(pipe.length > maxLength){
    pipe.shift();
  }
  return pipe;
}

function get(){
  return pipe;
}

function average(){
    var sum = 0;
    for( var i = 0; i < pipe.length; i++ ){
        sum += parseInt( pipe[i], 10 ); //don't forget to add the base
    }
    return sum / pipe.length;
}

module.exports = {
  add: add,
  get: get,
  init: init,
  average: average
}
