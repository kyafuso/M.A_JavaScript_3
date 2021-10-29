const todoList = []

const addTodo = () => {
    const todo = document.getElementById('add-todo').value;
    document.getElementById('add-todo').value = '';
    createTodo(todo);
}

const createTodo = (todo) => {
    todoList.push({comment: todo, status: '作業中'});
    
    const tbody = document.getElementsByTagName('tbody')[0];

    const tr = document.createElement('tr');
    
    const tdId = document.createElement('td');
    tdId.innerHTML = (todoList.length - 1);
    
    const tdComment = document.createElement('td');
    tdComment.innerHTML = todo;
    
    const tdStatus = document.createElement('td');
    createStatusButton(tdStatus);

    const tdDelete = document.createElement('td');
    createDeleteButton(tdDelete);

    tr.appendChild(tdId);
    tr.appendChild(tdComment);
    tr.appendChild(tdStatus);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
}

const createStatusButton = (td) => {
    const statusButton = document.createElement('button');
    statusButton.innerText = '作業中';
    td.appendChild(statusButton);
}

const createDeleteButton = (td) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '削除';
    td.appendChild(deleteButton);
}

document.getElementById('add-button').addEventListener('click', () => addTodo());