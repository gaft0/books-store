let array = [];

const minValue = -5;
const maxValue = 5;
const totalValue = 5;
let sum = 0;

for (let i = 0; i < totalValue; i++) {
    array[i] = Math.round(Math.random() * (maxValue - minValue) + minValue);
    sum += array[i];
    console.log(`Сгенерированное число: ${array[i]}`);
}

console.log(`\nСумма значений массива: ${sum}`);
process.exit();  