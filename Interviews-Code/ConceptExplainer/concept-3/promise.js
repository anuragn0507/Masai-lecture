

const myPromise = new Promise((resolve, reject) => {
    if(i >= o){
        resolve("Promise is resolved");
    }
    reject("Promise is rejected")
})


const funct=async()=>{
    let res = await myPromise;

    console.log("Result is", res)
}

funct();