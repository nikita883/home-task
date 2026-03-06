// Задача 1: Функция для сравнения двух пользователей
function getOlderUser(user1, user2) {
    if (user1.age > user2.age) {
        return user1.name;
    } else if (user2.age > user1.age) {
        return user2.name;
    } else {
        return "Пользователи одного возраста";
    }
}

// Задача 2: Функция для поиска старшего пользователя в массиве
function getOlderUserArray(users) {
    if (users.length === 0) {
        return "Массив пуст";
    }
    
    let oldestUser = users[0];
    
    for (let i = 1; i < users.length; i++) {
        if (users[i].age > oldestUser.age) {
            oldestUser = users[i];
        }
    }
    
    return oldestUser.name;
}

// Пример для задачи 1
let user1 = { name: 'Игорь', age: 17 };
let user2 = { name: 'Оля', age: 21 };

let result1 = getOlderUser(user1, user2);
console.log("Задача 1:");
console.log(result1); 

// Пример для задачи 2
let allUsers = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
];

let result2 = getOlderUserArray(allUsers);
console.log("\nЗадача 2:");
console.log(result2); 

console.log("\nДополнительные примеры:");

let user3 = { name: 'Анна', age: 25 };
let user4 = { name: 'Максим', age: 25 };
console.log(getOlderUser(user3, user4)); // Вывод: Пользователи одного возраста

// Пустой массив
console.log(getOlderUserArray([])); // Вывод: Массив пуст