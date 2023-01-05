function promiseFunct(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("I am a mobile Developer")
        }, 1000);
    })
}

async function resolvePromise(){
    console.log("Calling resolve function")
    const a = await promiseFunct();
    console.log("Value after resolving promise", a);
}

resolvePromise();