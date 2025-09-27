const readLine = require('readline');
const input = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.question('Введи первое число: ', (firstNumber) => {
    input.question('Введи второе число: ', (secondNumber) => {
        input.question('Введи третье число: ', (thirdNumber) => {
            const convertFirstNumber = Number(firstNumber);
            const convertSecondNumber = Number(secondNumber);
            const convertThirdNumber = Number(thirdNumber);

            if (isNaN(convertFirstNumber) || isNaN(convertSecondNumber) || isNaN(convertThirdNumber)) {
                console.log('Ты ввел не число!');
                process.exit();  
            }

            const array = [convertFirstNumber, convertSecondNumber, convertThirdNumber];
            const totalNumber = 3;
            let maxValue = firstNumber;

            for (let i = 0; i <= totalNumber; i++) {
                if (maxValue < array[i]) {
                    maxValue = array[i];
                }
            }

            console.log(`Наибольшее число из трех: ${maxValue}`);
            process.exit();  
        });
    });
});

/*
const totalNumber = 3;
const array = [];

for (let i = 0; i < totalNumber; i++) {
    input.question('Введи число: ', (array[i]) => {
        const convertNumber = Number(array[i]);

        if (isNaN(convertNumber)) {
            console.log('Ты ввел не число!');
            process.exit();  
        }
    });
}

let maxValue = array[0];
for (let i = 0; i <= totalNumber; i++) {
    if (maxValue < array[i]) {
        maxValue = array[i];
    }
}
console.log(`Наибольшее число из трех: ${maxValue}`);
process.exit();  
*/