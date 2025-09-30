let array = [];

const minValue = -5;
const maxValue = 5;
const totalValue = 5;

for (let i = 0; i < totalValue; i += 2) {
    array[i] = Math.round(Math.random() * (maxValue - minValue) + minValue);
    console.log(`Индекс числа: ${i}. Число: ${array[i]}`);
}

process.exit();  