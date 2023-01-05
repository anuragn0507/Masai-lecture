const multiply=(x, y)=>{
    console.log(x * y);
}

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5);

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5);


function bindCurr(x, y){
    console.log(x*y);
}

let multiplyBy2 = bindCurr.bind(this, 2);
multiplyBy2(10);

const bindCurr2=(x,y)=>{
    console.log(x*y);
}
let mul = bindCurr2.bind(this, 5);
mul(5);

const bindCurr3 = function(){

}











