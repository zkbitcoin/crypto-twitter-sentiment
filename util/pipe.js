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

module.exports = {
  add: add,
  get: get,
  init: init
}
