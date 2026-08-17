function add(firstnumber, secondnumber) {
    return firstnumber + secondnumber;
}
function subtract(firstnumber, secondnumber) {
    return firstnumber - secondnumber;
}
function multiply(firstnumber, secondnumber) {
    return firstnumber * secondnumber;
}   
function divide(firstnumber, secondnumber) {
    if (secondnumber === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return firstnumber / secondnumber;
}
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}
function kilometersToMiles(kilometers) {
    return kilometers * 0.621371;
}
function ageInMonths(age) {
    return age * 12;
}
function RectangularArea(height, width) {
    return height * width;
}
const firstNumber = 10;
const secondNumber = 5;
const celsius = 25;
const kilometers = 10;
const ageInYears = 19;
const height = 5;
const width = 10;

console.log(`Addition: ${add(firstNumber, secondNumber)}`);
console.log(`Subtraction: ${subtract(firstNumber, secondNumber)}`);
console.log(`Multiplication: ${multiply(firstNumber, secondNumber)}`);
console.log(`Division: ${divide(firstNumber, secondNumber)}`);
console.log(`Celsius to Fahrenheit: ${celsiusToFahrenheit(celsius)}`);
console.log(`Kilometers to Miles: ${kilometersToMiles(kilometers)}`);
console.log(`Age in Months: ${ageInMonths(ageInYears)}`);
console.log(`Rectangular Area: ${RectangularArea(height, width)}`);
