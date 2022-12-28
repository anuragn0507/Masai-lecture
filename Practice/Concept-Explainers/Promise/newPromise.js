var promise = new Promise(function(resolve, reject){
    const x = "Anurag"
    const y = "Anurag"

    if(x===y){
        resolve();
    }else{
        reject();
    }
})

promise.then(()=>{
    console.log("Success");
}).catch((err)=>{
    console.log("Error");
})