function * func(){
    yield 10;
    yield 20;
    yield 30;

}
var gen = func();

console.log(gen.next().value);
console.log(gen.next().value);
