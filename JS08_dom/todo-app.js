(function() {
    // ============================================
    // Функции для работы с LocalStorage (Этап 5)
    // ============================================
    
    function saveToLocalStorage(key, data) {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }
    
    function loadFromLocalStorage(key) {
        const jsonData = localStorage.getItem(key);
        if (jsonData) {
            return JSON.parse(jsonData);
        }
        return null;
    }
    
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(todo, onDoneChange, onDelete) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        
        let textSpan = document.createElement('span');
        textSpan.textContent = todo.name;
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('mr-2');
        checkbox.checked = todo.done;
        
        let textContainer = document.createElement('div');
        textContainer.classList.add('d-flex', 'align-items-center', 'flex-grow-1');
        textContainer.append(checkbox);
        textContainer.append(textSpan);
        
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        // Применяем стиль зачёркивания в зависимости от статуса
        if (todo.done) {
            textSpan.classList.add('text-decoration-line-through', 'text-muted');
        }
        
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';
        
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(textContainer);
        item.append(buttonGroup);
        
        // Обработчик для чекбокса
        checkbox.addEventListener('change', function() {
            // Вызываем колбэк для изменения статуса
            if (onDoneChange) {
                onDoneChange(checkbox.checked);
            }
            // Меняем стиль текста
            if (checkbox.checked) {
                textSpan.classList.add('text-decoration-line-through', 'text-muted');
            } else {
                textSpan.classList.remove('text-decoration-line-through', 'text-muted');
            }
        });
        
        // Обработчик для кнопки "Готово"
        doneButton.addEventListener('click', function() {
            // Переключаем состояние чекбокса
            checkbox.checked = !checkbox.checked;
            // Вызываем событие change, чтобы сработал обработчик выше
            const changeEvent = new Event('change');
            checkbox.dispatchEvent(changeEvent);
        });
        
        // Обработчик для кнопки "Удалить"
        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить это дело?')) {
                if (onDelete) {
                    onDelete();
                }
            }
        });
        
        return {
            item,
            doneButton,
            deleteButton,
            checkbox,
            textSpan,
        };
    }
    
    function generateId(todos) {
        if (todos.length === 0) {
            return 1;
        }
        const maxId = Math.max(...todos.map(todo => todo.id));
        return maxId + 1;
    }
    
    function updateStats(container, todos) {
        let statsDiv = container.querySelector('.todo-stats');
        if (!statsDiv) {
            statsDiv = document.createElement('div');
            statsDiv.classList.add('mt-3', 'text-muted', 'todo-stats');
            container.appendChild(statsDiv);
        }
        const total = todos.length;
        const completed = todos.filter(todo => todo.done).length;
        statsDiv.textContent = `Всего дел: ${total} | Выполнено: ${completed}`;
    }
    
    function checkEmptyList(todoList, todos) {
        const emptyMessage = todoList.querySelector('.empty-message');
        if (todos.length === 0) {
            if (!emptyMessage) {
                const message = document.createElement('li');
                message.className = 'list-group-item text-center text-muted empty-message';
                message.textContent = 'Список дел пуст. Добавьте новое дело!';
                todoList.append(message);
            }
        } else {
            if (emptyMessage) {
                emptyMessage.remove();
            }
        }
    }
    
    function createTodoApp(container, title = 'Список дел', listName = 'default') {
        // Очищаем контейнер, чтобы не было дублирования
        container.innerHTML = '';
        
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        let todos = [];
        
        function saveTodos() {
            saveToLocalStorage(listName, todos);
            updateStats(container, todos);
            checkEmptyList(todoList, todos);
        }
        
        function renderTodoList() {
            todoList.innerHTML = '';
            
            todos.forEach(todo => {
                const todoItem = createTodoItem(
                    todo,
                    function(newDoneStatus) {
                        // Обновляем статус в массиве
                        const foundTodo = todos.find(t => t.id === todo.id);
                        if (foundTodo) {
                            foundTodo.done = newDoneStatus;
                            saveTodos();
                        }
                    },
                    function() {
                        // Удаляем дело из массива
                        todos = todos.filter(t => t.id !== todo.id);
                        renderTodoList();
                        saveTodos();
                    }
                );
                todoList.append(todoItem.item);
            });
            
            updateStats(container, todos);
            checkEmptyList(todoList, todos);
        }
        
        function updateButtonState() {
            if (todoItemForm.input.value.trim() === '') {
                todoItemForm.button.disabled = true;
            } else {
                todoItemForm.button.disabled = false;
            }
        }
        
        // Этап 2: устанавливаем начальное состояние кнопки
        updateButtonState();
        
        // Этап 2: добавляем обработчик для отслеживания изменений в поле ввода
        todoItemForm.input.addEventListener('input', updateButtonState);
        
        // Обработчик отправки формы
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!todoItemForm.input.value.trim()) {
                return;
            }
            
            // Этап 1 и 3: создаём объект дела
            const newTodo = {
                id: generateId(todos),
                name: todoItemForm.input.value.trim(),
                done: false
            };
            
            todos.push(newTodo);
            saveTodos();
            renderTodoList();
            
            // Очищаем поле ввода
            todoItemForm.input.value = '';
            updateButtonState();
        });
        
        // Этап 6: загружаем данные из localStorage
        const storedTodos = loadFromLocalStorage(listName);
        if (storedTodos && Array.isArray(storedTodos)) {
            todos = storedTodos;
            renderTodoList();
        } else {
            renderTodoList();
        }
    }
    
    window.createTodoApp = createTodoApp;
})();