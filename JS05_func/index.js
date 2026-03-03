// Задание №1
function getAge(birthYear) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let age = currentYear - birthYear;
    return age;
}
console.log(getAge(1998)); 
console.log(getAge(1991)); 
console.log(getAge(2007)); 


// Задание №2
function filter(whiteList, blackList) {
    let result = [];
    
    for (let i = 0; i < whiteList.length; i++) {
        let email = whiteList[i];
        if (!blackList.includes(email)) {
            result.push(email);
        }
    }
    
    return result;
}

// Массив с адресами (белый список)
let whiteList = ['popov@mail.ru', 'nikita@mail.ru', 'diti@mail.ru', 'mifi@mail.ru'];

// Массив с адресами (чёрный список)
let blackList = ['dtk@mail.ru', 'molochka@mail.ru'];

// Вызов функции
let result = filter(whiteList, blackList);
console.log(result); // ['popov@mail.ru', 'diti@mail.ru'', 'molochka@mail.ru']


// Задание №3
function arrSort(arr) {
    let sortedArray = [...arr];
    for (let i = 0; i < sortedArray.length - 1; i++) {
        for (let j = 0; j < sortedArray.length - 1 - i; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                let temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
            }
        }
    }
    
    return sortedArray;
}

// Проверка работы функции
console.log(arrSort([2, 5, 1, 3, 4]));       
console.log(arrSort([12, 33, 3, 44, 100]));  
console.log(arrSort([0, 1]));                 
console.log(arrSort([100, 85, 42, 17, 8]));   