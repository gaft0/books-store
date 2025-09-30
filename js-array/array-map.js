function newMap(array, callback) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(callback(array[i]));
    }
    
    return newArray;
}

const testFirstArray = [1, 2, 3, 4, 5];
const testSecondArray = ['Hello', ',', 'World', '!'];

let testReturn = newMap(testFirstArray, number => number += 3);
console.log(testReturn);

testReturn = newMap(testFirstArray, number => number **= 2);
console.log(testReturn);

testReturn = newMap(testSecondArray, word => word += '$');
console.log(testReturn);