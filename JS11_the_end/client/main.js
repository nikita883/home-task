let studentsList = []; 
let currentSortColumn = 'fio';

const API_URL = 'http://localhost:3000/api/todos'; // твой TODO-сервер

//  API 
async function getAllStudents() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Не удалось загрузить данные');
    
    const todos = await response.json();
    
    return todos.map(todo => {
        try {
            const parsed = JSON.parse(todo.name);
            return {
                id: todo.id,
                surname: parsed.surname || '',
                name: parsed.name || '',
                lastname: parsed.lastname || '',
                birthday: new Date(parsed.birthday),
                faculty: parsed.faculty || '',
                startYear: parsed.startYear || 2021
            };
        } catch (e) {
            return {
                id: todo.id,
                surname: '',
                name: todo.name || 'Без названия',
                lastname: '',
                birthday: new Date(),
                faculty: todo.owner || 'Не указан',
                startYear: 2021
            };
        }
    });
}

async function createStudent(studentData) {
    const studentJson = JSON.stringify({
        surname: studentData.surname,
        name: studentData.name,
        lastname: studentData.lastname,
        birthday: studentData.birthday.toISOString().split('T')[0],
        faculty: studentData.faculty,
        startYear: studentData.startYear
    });

    const todoData = {
        name: studentJson,
        owner: studentData.faculty,
        done: false
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
    });

    if (!response.ok) throw new Error('Не удалось добавить студента');
    const newTodo = await response.json();

    return { id: newTodo.id, ...studentData };
}

async function deleteStudent(id) {
    const url = `${API_URL}/${id}`;
    console.log('🗑️ Пытаемся удалить ID:', id, 'по адресу:', url);

    const response = await fetch(url, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    console.log('Статус ответа сервера:', response.status);

    if (!response.ok) {
        let errorText = '';
        try { errorText = await response.text(); } catch (e) {}
        throw new Error(`Сервер вернул ${response.status} — ${errorText || 'без сообщения'}`);
    }

    console.log('✅ Удаление прошло успешно');
}

//  ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ 
function getFullName(student) {
    return `${student.surname} ${student.name} ${student.lastname}`.trim();
}

function formatDateAndAge(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
    
    return `${day}.${month}.${year} (${age} лет)`;
}

function formatEducation(startYear) {
    const sYear = parseInt(startYear);
    const endYear = sYear + 4;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let status = '';
    if (currentYear > endYear || (currentYear === endYear && currentMonth >= 8)) {
        status = 'закончил';
    } else {
        let course = currentYear - sYear + (currentMonth >= 8 ? 1 : 0);
        if (course <= 0) course = 1;
        status = course > 4 ? 'закончил' : `${course} курс`;
    }
    return `${sYear}-${endYear} (${status})`;
}

//  ОТРИСОВКА 
function renderStudentsTable() {
    const tbody = document.getElementById('students-table-body');
    tbody.innerHTML = '';

    const filterFio = document.getElementById('filter-fio').value.toLowerCase();
    const filterFac = document.getElementById('filter-faculty').value.toLowerCase();
    const filterStart = document.getElementById('filter-start').value;
    const filterEnd = document.getElementById('filter-end').value;

    let filteredList = studentsList.filter(s => {
        const fullName = getFullName(s).toLowerCase();
        const endYear = parseInt(s.startYear) + 4;
        
        return fullName.includes(filterFio) &&
               s.faculty.toLowerCase().includes(filterFac) &&
               (!filterStart || s.startYear == filterStart) &&
               (!filterEnd || endYear == filterEnd);
    });

    filteredList.sort((a, b) => {
        let valA, valB;
        if (currentSortColumn === 'fio') { valA = getFullName(a); valB = getFullName(b); }
        else if (currentSortColumn === 'faculty') { valA = a.faculty; valB = b.faculty; }
        else if (currentSortColumn === 'birth') { valA = a.birthday; valB = b.birthday; }
        else if (currentSortColumn === 'start') { valA = a.startYear; valB = b.startYear; }

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
    });

    filteredList.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${getFullName(student)}</td>
            <td>${student.faculty}</td>
            <td>${formatDateAndAge(student.birthday)}</td>
            <td>${formatEducation(student.startYear)}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${student.id}">Удалить</button>
            </td>
        `;
        tbody.append(tr);
    });
}

//  ОСНОВНАЯ ЛОГИКА 
async function loadStudents() {
    try {
        studentsList = await getAllStudents();
    } catch (err) {
        console.error(err);
        studentsList = [];
        alert('Не удалось загрузить данные с сервера. Убедитесь, что сервер (node index.js) запущен');
    }
}

document.getElementById('add-student-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const errorBox = document.getElementById('error-messages');
    errorBox.innerHTML = '';

    const surname = document.getElementById('input-surname').value.trim();
    const name = document.getElementById('input-name').value.trim();
    const lastname = document.getElementById('input-lastname').value.trim();
    const faculty = document.getElementById('input-faculty').value.trim();
    const birthday = document.getElementById('input-birth').valueAsDate;
    const startYear = parseInt(document.getElementById('input-start-year').value);

    const errors = [];
    const today = new Date();
    const minDate = new Date(1900, 0, 1);

    if (!surname || !name || !lastname || !faculty || !birthday || !startYear) errors.push('Заполните все поля');
    if (birthday < minDate || birthday > today) errors.push('Дата рождения некорректна (от 1900 до сегодня)');
    if (startYear < 2000 || startYear > today.getFullYear()) errors.push('Год начала обучения должен быть от 2000 до текущего');

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join('<br>');
        return;
    }

    try {
        await createStudent({ surname, name, lastname, faculty, birthday, startYear });
        await loadStudents();        // ← перезагружаем список с сервера
        renderStudentsTable();
        this.reset();
    } catch (err) {
        errorBox.innerHTML = 'Ошибка при добавлении на сервер';
        console.error(err);
    }
});

// Фильтры и сортировка
['filter-fio', 'filter-faculty', 'filter-start', 'filter-end'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderStudentsTable);
});

document.getElementById('sort-fio').onclick = () => { currentSortColumn = 'fio'; renderStudentsTable(); };
document.getElementById('sort-faculty').onclick = () => { currentSortColumn = 'faculty'; renderStudentsTable(); };
document.getElementById('sort-birth').onclick = () => { currentSortColumn = 'birth'; renderStudentsTable(); };
document.getElementById('sort-start').onclick = () => { currentSortColumn = 'start'; renderStudentsTable(); };

// УДАЛЕНИЕ 
document.getElementById('students-table-body').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        if (isNaN(id)) return;

        if (confirm('Вы действительно хотите удалить этого студента?')) {
            try {
                await deleteStudent(id);
            } catch (err) {
                console.error('❌ Ошибка при удалении:', err);
                alert('Ошибка при удалении:\n' + err.message);
            } finally {
                // В любом случае перезагружаем список с сервера
                await loadStudents();
                renderStudentsTable();
            }
        }
    }
});

async function initializeApp() {
    await loadStudents();
    renderStudentsTable();
}

initializeApp();