// Задача 3: Функция фильтрации массива объектов
function filter(array, propertyName, value) {
    let result = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i][propertyName] === value) {
            result.push(array[i]);
        }
    }
    
    return result;
}

function filterModern(array, propertyName, value) {
    return array.filter(item => item[propertyName] === value);
}

// Пример использования
let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
];

console.log("Задача 3:");
console.log("Исходный массив:");
console.log(objects);

// Фильтрация по имени
let result1 = filter(objects, 'name', 'Иван');
console.log("\nФильтрация по имени 'Иван':");
console.log(result1); 

// Дополнительные примеры для проверки
console.log("\nДополнительные примеры:");

// Фильтрация по фамилии
let result2 = filter(objects, 'surname', 'Петров');
console.log("Фильтрация по фамилии 'Петров':");
console.log(result2);
// Ожидаемый вывод: [ { name: 'Пётр', surname: 'Петров' } ]

// Фильтрация по несуществующему значению
let result3 = filter(objects, 'name', 'Мария');
console.log("Фильтрация по несуществующему имени:");
console.log(result3);

let products = [
    { name: 'Яблоко', category: 'Фрукты', price: 50 },
    { name: 'Банан', category: 'Фрукты', price: 30 },
    { name: 'Морковь', category: 'Овощи', price: 20 },
    { name: 'Апельсин', category: 'Фрукты', price: 40 }
];

let fruits = filter(products, 'category', 'Фрукты');
console.log("\nФильтрация продуктов по категории 'Фрукты':");
console.log(fruits);