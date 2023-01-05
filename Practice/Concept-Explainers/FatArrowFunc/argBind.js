function regularFunction(a, b){
    console.log(arguments)
}
regularFunction(1,2)

const arrowFunction = (a,b) => {
    console.log(arguments)
}
arrowFunction(1,2)

var arrowFunction1=(...args)=>{
    console.log(...args)
}
arrowFunction1(1,2)