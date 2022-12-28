// var promise = new Promise((resolve, reject)=>{
//     const x = "Anurag"
//     const y = "Yadav"

//     if(x===y){
//         resolve()
//     }else{
//         reject();
//     }
// })

// promise.then((result)=>{
//     console.log("Promise is succeeded ");
// }).catch((err)=>{
//     console.log("Something went wrong");
// })

var promise = new Promise((resolve, reject) => {
    const x = "anurag"
    const y = "anurag"
    if(x===y){
        resolve("promise is resolve")
    }
    else{
        reject("promise is reject")
    }
})

promise.then((result)=>{
    console.log("What is the conclusion of promise?", "ans =", result)
}).catch((err)=>{
    console.log(err)
})