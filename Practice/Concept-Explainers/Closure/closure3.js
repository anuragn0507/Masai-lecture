(function immediateA(a) {
  return (function immediateB(b) {
    console.log(a); // What is logged?
  })(1);
})(0);

/**  0 is logged to the console.

immediateA is called with the argument 0, thus a parameter is 0.

immediateB function, being nested into immediateA function, is a closure that captures a variable from the outer immediateA scope, where a is 0. Thus console.log(a) logs 0. **/
