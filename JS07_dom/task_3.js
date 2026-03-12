function createStudentsList(listArr) {
    const ul = document.createElement('ul');

    for (let student of listArr) {
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        const span = document.createElement('span');

        h2.textContent = student.name;
        span.textContent = `Возраст: ${student.age} лет`;

        li.appendChild(h2);
        li.appendChild(span);
        ul.appendChild(li);
    }

    document.body.appendChild(ul);
}

// Пример вызова:
let allStudents = [
    {name: 'Валя', age: 11},
    {name: 'Таня', age: 24},
    {name: 'Рома', age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
];

createStudentsList(allStudents);