let firstArray = [];
let secondArray = [];

const minValue = -5;
const maxValue = 5;
const totalValue = 5;

console.log('\nПервый массив:');
for (let i = 0; i < totalValue; i++) {
    firstArray[i] = Math.round(Math.random() * (maxValue - minValue) + minValue);
    console.log(`Сгенерированное число: ${firstArray[i]}`);
}

console.log('\nВторой массив:');
for (let i = 0; i < totalValue; i++) {
    secondArray[i] = Math.round(Math.random() * (maxValue - minValue) + minValue);
    console.log(`Сгенерированное число: ${secondArray[i]}`);
}

console.log('\nСовпавшие числа:');
const match = firstArray.filter(value => secondArray.includes(value));
console.log(match);

process.exit();  