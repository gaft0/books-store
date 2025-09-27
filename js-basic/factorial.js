const readLine = require('readline');
const input = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.question('Введи число: ', (number) => {
    const convertNumber = Number(number);

    if (isNaN(convertNumber)) {
        console.log('Ты ввел не число!');
        process.exit();  
    }

    let factorial = 1;
    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }

    console.log(`Факториал числа ${number} равен ${factorial}`);
    process.exit();  
});