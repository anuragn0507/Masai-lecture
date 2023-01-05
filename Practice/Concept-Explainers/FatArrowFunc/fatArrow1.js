// // 1️⃣ Simple Invocation
// function simpleInvocation() {
//     console.log(this);
// }
// simpleInvocation(); 
// // Window Object

// 2️⃣ Method Invocation
const methodInvocation = {
  method() {
      console.log("second", this);
  }
};
methodInvocation.method(); 
// logs methodInvocation object




// 3️⃣ Indirect Invocation
const context = { aVal: 'A', bVal: 'B' };
function indirectInvocation() {
    console.log(this, "using call apply ");
}
indirectInvocation.call(context);  // logs { aVal: 'A' }
indirectInvocation.apply( context); // logs { bVal: 'A' }




// 4️⃣ Constructor Invocation
function constructorInvocation() {
    console.log(this, "constuctor invocation");
}
new constructorInvocation(); 
constructorInvocation()
// logs an instance of constructorInvocation