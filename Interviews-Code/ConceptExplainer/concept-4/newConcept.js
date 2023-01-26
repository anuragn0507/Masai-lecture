
let arry = [1,2,9,1,4,3,8,4,3,5,9,6,7];

let newAns =[];
for( let i=0; i< arry.length; i++ ){
    if(!newAns.includes(arry[i])){
        newAns.push(arry[i]);
    }

}
newAns.sort((a, b)=> a-b);
// console.log(newAns);


let arr = [{
    name: 'arjun',
    books: ['harry potter', 'ikigai']
  },{
    name: 'himanshu',
    books: ['game of thrones', 'lord of the rings']
  },{
    name: 'akash',
    books: ['the hobbit', 'the shinning']
  }]


//   let ansArr = [{books:{...[...arr.books]}}]
 let ansAr = [];
  for(let i=0; i<arr.length;  i++){
    ansAr.push(...arr[i].books)
  }
  console.log("ansArr kya hai", ansAr)



// const map1 = new Map();

// for( let i=0; i< arry.length; i++ ){
//     if(!map1.get(arry[i])){
//         map1.set(arry[i], 1);
//     }
// }
// let ans = []
// let keys = map1.keys();
// ans.push(keys)
// console.log(ans.sort())
