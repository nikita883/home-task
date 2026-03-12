function createStudentCard(student) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const span = document.createElement('span');

    h2.textContent = student.name;
    span.textContent = `Возраст: ${student.age} лет`;

    div.appendChild(h2);
    div.appendChild(span);
    document.body.appendChild(div);
}

// Пример вызова:
let studentObj = { name: 'Никита', age: 19 };
createStudentCard(studentObj);