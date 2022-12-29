const infinite= function(a){
    return function(b){
        if(b){
            return infinite(a+b);
        }else{
            return a;
        }
    }
}

console.log(infinite(2)(3)(6)());