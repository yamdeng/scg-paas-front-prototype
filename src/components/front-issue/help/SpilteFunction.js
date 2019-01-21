let SpliteFunction = {};

function test1() {
  alert('test1');
}

function test2() {
  alert('test1');
}

SpliteFunction.test1 = test1;
SpliteFunction.test2 = test2;

export default SpliteFunction;
