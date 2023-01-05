const infinite = function (a) {
  return function (b) {
    if (b) {
      return infinite(a + b);
    } else {
      return a;
    }
  };
};

console.log(infinite(2)(3)(6)());

const newInfinite = (a) => {
  return (b) => {
    if (b) {
      return newInfinite(a + b);
    } else {
      return a;
    }
  };
};

console.log(newInfinite(2)(3)(4)());



const infiniteFunct =(a)=>{
    return (b)=>{
        if(b){
            return infiniteFunct(a+b);
        }else{
            return a;
        }
    }
}

console.log(infiniteFunct(2)(3)(4)(6)());
