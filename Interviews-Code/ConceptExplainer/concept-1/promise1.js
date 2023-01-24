
const myPromise = new Promise((resolve, reject) => {
    resolve("Promise resolve ho gya")
    reject('promise reject ho gya hai')
})

// const func1=async()=>{
    const ans = myPromise;
    console.log(ans);

// }
// func1();