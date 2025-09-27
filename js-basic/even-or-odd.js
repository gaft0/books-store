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

    if (convertNumber % 2 === 0) {
        console.log(`Число ${number} четное.`);
    } else {
        console.log(`Число ${number} нечетное.`);
    }
    process.exit();  
});