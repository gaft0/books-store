function newFilter(array, callback) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

const testFirstArray = [1, 2, 3, 4, 5];
const testSecondArray = ['Hello', ',', 'World', '!'];

let testReturn = newFilter(testFirstArray, number => number < 3);
console.log(testReturn);

testReturn = newFilter(testFirstArray, number => number % 2 === 0);
console.log(testReturn);

testReturn = newFilter(testSecondArray, word => word.length === 1);
console.log(testReturn);