let addMessage = document.querySelector('.message'), //отримали input
    addButton = document.querySelector('.add');      //отримали add
todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo')); //перевіряє чи є дані в локалі й вносить їх в масив
    displayMessages();
}

addButton.addEventListener('click', function () {
    if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));  //поверне нам строку в JSON форматі, та дозволяє зберегти дані в LocalStorage
    addMessage.value = '';
});

function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function (item, i) {
        displayMessage += ` 
        <li>
            <input type = 'checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for = 'item_${i}' class="${item.important ? 'important' : ''}"">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function (event) {  // якщо елемент списку зазнав змін(change)(тут змінився checked)
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');  //отримуємо лейбл з чекбоксом
    let valueLabel = forLabel.innerHTML;  // Отримуємо текст всередині лейблу

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function (event) { //подія при виклкику контекстного меню
    event.preventDefault();                             //видаляємо подію по замовчуванню
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);                  //видаляє елемент з масиву
            } else {
                item.important = !item.important;
            }

            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

