let array = [];

const minValue = -5;
const maxValue = 5;
const totalValue = 5;

for (let i = 0; i < totalValue; i++) {
    array[i] = Math.round(Math.random() * (maxValue - minValue) + minValue);
    console.log(`Сгенерированное число: ${array[i]}`);
}
console.log('\nСортировка массива по убыванию:');

for (let i = 0; i < totalValue; i++) {
    for (let j = 0; j < totalValue; j++) {
        if (array[j] < array[j + 1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp; 
        }
    }
}

for (let i = 0; i < totalValue; i++) {
    console.log(`Число: ${array[i]}`);
}

process.exit();  