const todoList = []

const onClickAdd = () => {
    const addText = document.getElementById('add-text').value;
    document.getElementById('add-text').value = '';
    createTodolist(addText);
}

const createTodolist = (todo) => {
    todoList.push(todo)
    
    const tbody = document.getElementsByTagName('tbody')[0];

    const tr = document.createElement('tr');
    
    const tdId = document.createElement('td');
    tdId.innerHTML = (todoList.length - 1);
    
    const tdComment = document.createElement('td');
    tdComment.innerHTML = todo;
    
    const tdStatus = document.createElement('td');
    const statusButton = document.createElement('button');
    statusButton.innerText = '作業中';
    tdStatus.appendChild(statusButton);

    const tdDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '削除';
    tdDelete.appendChild(deleteButton);

    tr.appendChild(tdId);
    tr.appendChild(tdComment);
    tr.appendChild(tdStatus);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
}

document.getElementById('add-button').addEventListener('click', () => onClickAdd());