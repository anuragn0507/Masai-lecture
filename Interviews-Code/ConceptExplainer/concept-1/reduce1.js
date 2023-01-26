const array1 = [1, 2, 3, 4];

const initialValue = 55;

const sumInitial = array1.reduce(
    (accumlator, currentValue, currentIndex, array) => accumlator + currentValue,
    initialValue
)