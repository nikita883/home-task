// Задание №1. Проверка паролей.
let password = "qaz-xsw"; 

if (password.length >= 4 && (password.includes('-') || password.includes('_'))) {
    console.log("Пароль надёжный");
} else {
    console.log("Пароль недостаточно надёжный");
}


// Задание №2. Преобразование регистра.
let userName = "niKiTA";
let userSurname = "Nikolay";

let formattedName = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase();
let formattedSurname = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1).toLowerCase();

console.log(formattedName);      
console.log(formattedSurname);   

console.log(userName === formattedName ? "Имя осталось без изменений" : "Имя было преобразовано");
console.log(userSurname === formattedSurname ? "Имя осталось без изменений" : "Имя было преобразовано");


// Задание №3. Проверка чётности числа.
let number = 213; 

if (number % 2 === 0) {
    console.log("Число чётное");
} else {
    console.log("Число нечётное");
}