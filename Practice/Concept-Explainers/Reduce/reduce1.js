const arr1 =[1, 2, 3, 4, 5];

const initialValue = 55;

const value = arr1.reduce(
    (accum, curr) => accum + curr,
    initialValue
)

console.log(value);