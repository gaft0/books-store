const readLine = require('readline');
const input = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.question('Введи первое число: ', (firstNumber) => {
    input.question('Введи второе число: ', (secondNumber) => {
        input.question('Введи арифметический оператор: ', (operator) => {
            const convertFirstNumber = Number(firstNumber);
            const convertSecondNumber = Number(secondNumber);

            if (isNaN(convertFirstNumber) || isNaN(convertSecondNumber)) {
                console.log('Ты ввел не число!');
                process.exit();  
            }

            switch(operator) {
                case '+':
                    console.log(`Ответ: ${convertFirstNumber + convertSecondNumber}`);
                    break;
                case '-':
                    console.log(`Ответ: ${convertFirstNumber - convertSecondNumber}`);
                    break;
                case '/':
                    if (convertSecondNumber === 0) {
                        console.log('На 0 делить нельзя!');
                        break;
                    }
                    console.log(`Ответ: ${convertFirstNumber / convertSecondNumber}`);
                    break;
                case '*':
                    console.log(`Ответ: ${convertFirstNumber * convertSecondNumber}`);
                    break;
                default: 
                    console.log('Ты ввел не арифметический оператор!');
            }
            process.exit();  
        });
    });
});