function first(a){
    return function second(b){
        return function third(c){
            return function fourth(d){
                console.log(a+b+c+d);
            }
        }
    }
}

first(2)(3)(4)(5);

// normal function
let multiply=(a, b, c)=> a + b + c;
console.log(multiply(2, 3, 4));

// currying function
let mul= name => surname => proffession => name + surname + proffession;
console.log(mul("anurag")("yadav")("engineer"));


const sum = function(a) {
	return function(b) {
		if (b) {
			return sum(a + b);
		} else {
			return a;
		}
	}
}
console.log(sum(2)(3)(6)());