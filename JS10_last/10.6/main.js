let studentsList = [
    { surname: 'Иванов', name: 'Иван', lastname: 'Иванович', birthday: new Date(2001, 4, 15), faculty: 'Информатика', startYear: 2021 },
    { surname: 'Петрова', name: 'Анна', lastname: 'Сергеевна', birthday: new Date(1998, 11, 31), faculty: 'Экономика', startYear: 2019 },
    { surname: 'Сидоров', name: 'Кирилл', lastname: 'Олегович', birthday: new Date(2003, 2, 10), faculty: 'Дизайн', startYear: 2023 }
];

let currentSortColumn = 'fio'; // Текущая колонка для сортировки

// Вспомогательная функция для сборки ФИО (Фамилия Имя Отчество) 
function getFullName(student) {
    return `${student.surname} ${student.name} ${student.lastname}`.trim();
}

// Форматирование даты и расчет возраста 
function formatDateAndAge(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
    }
    
    return `${day}.${month}.${year} (${age} лет)`;
}

// Расчет годов обучения и номера курса 
function formatEducation(startYear) {
    const sYear = parseInt(startYear);
    const endYear = sYear + 4;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11, сентябрь — 8

    let status = '';
    // Если текущий год больше года окончания ИЛИ текущий год равен году окончания и уже сентябрь
    if (currentYear > endYear || (currentYear === endYear && currentMonth >= 8)) {
        status = 'закончил';
    } else {
        // Курс = разница лет. Если сентябрь наступил, идет следующий курс.
        let course = currentYear - sYear + (currentMonth >= 8 ? 1 : 0);
        if (course <= 0) course = 1; // Если еще не наступил сентябрь первого года
        status = course > 4 ? 'закончил' : `${course} курс`;
    }
    
    return `${sYear}-${endYear} (${status})`;
}

// Этап 3 & 4. Функция отрисовки таблицы 
function renderStudentsTable() {
    const tbody = document.getElementById('students-table-body');
    tbody.innerHTML = '';

    // Получаем значения фильтров 
    const filterFio = document.getElementById('filter-fio').value.toLowerCase();
    const filterFac = document.getElementById('filter-faculty').value.toLowerCase();
    const filterStart = document.getElementById('filter-start').value;
    const filterEnd = document.getElementById('filter-end').value;

    // Сначала фильтруем, не меняя основной массив 
    let filteredList = studentsList.filter(s => {
        const fullName = getFullName(s).toLowerCase();
        const endYear = parseInt(s.startYear) + 4;
        
        return fullName.includes(filterFio) &&
               s.faculty.toLowerCase().includes(filterFac) &&
               (!filterStart || s.startYear == filterStart) &&
               (!filterEnd || endYear == filterEnd);
    });

    // Затем сортируем 
    filteredList.sort((a, b) => {
        let valA, valB;
        if (currentSortColumn === 'fio') { valA = getFullName(a); valB = getFullName(b); }
        if (currentSortColumn === 'faculty') { valA = a.faculty; valB = b.faculty; }
        if (currentSortColumn === 'birth') { valA = a.birthday; valB = b.birthday; }
        if (currentSortColumn === 'start') { valA = a.startYear; valB = b.startYear; }

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
    });

    // Выводим в DOM 
    filteredList.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${getFullName(student)}</td>
            <td>${student.faculty}</td>
            <td>${formatDateAndAge(student.birthday)}</td>
            <td>${formatEducation(student.startYear)}</td>
        `;
        tbody.append(tr);
    });
}

// Этап 5. Обработка формы и валидация 
document.getElementById('add-student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorBox = document.getElementById('error-messages');
    errorBox.innerHTML = '';

    const surname = document.getElementById('input-surname').value.trim();
    const name = document.getElementById('input-name').value.trim();
    const lastname = document.getElementById('input-lastname').value.trim();
    const faculty = document.getElementById('input-faculty').value.trim();
    const birthday = document.getElementById('input-birth').valueAsDate; // [cite: 53]
    const startYear = parseInt(document.getElementById('input-start-year').value);

    const errors = [];
    const today = new Date();
    const minDate = new Date(1900, 0, 1);

    if (!surname || !name || !lastname || !faculty || !birthday || !startYear) {
        errors.push('Заполните все поля [cite: 16]');
    }
    if (birthday < minDate || birthday > today) {
        errors.push('Дата рождения некорректна (от 1900 до сегодня) [cite: 17]');
    }
    if (startYear < 2000 || startYear > today.getFullYear()) {
        errors.push('Год начала обучения должен быть от 2000 до текущего [cite: 18]');
    }

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join('<br>');
        return;
    }

    // Добавляем объект в массив 
    studentsList.push({ surname, name, lastname, birthday, faculty, startYear });
    this.reset();
    renderStudentsTable();
});

// События фильтрации 
['filter-fio', 'filter-faculty', 'filter-start', 'filter-end'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderStudentsTable);
});

// События сортировки 
document.getElementById('sort-fio').onclick = () => { currentSortColumn = 'fio'; renderStudentsTable(); };
document.getElementById('sort-faculty').onclick = () => { currentSortColumn = 'faculty'; renderStudentsTable(); };
document.getElementById('sort-birth').onclick = () => { currentSortColumn = 'birth'; renderStudentsTable(); };
document.getElementById('sort-start').onclick = () => { currentSortColumn = 'start'; renderStudentsTable(); };

// Первый запуск
renderStudentsTable();