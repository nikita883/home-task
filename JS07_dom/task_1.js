function createStudentCard(name, age) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const span = document.createElement('span');

    h2.textContent = name;
    span.textContent = `Возраст: ${age} лет`;

    div.appendChild(h2);
    div.appendChild(span);
    document.body.appendChild(div);
}

// Пример вызова:
createStudentCard('Никита', 19);