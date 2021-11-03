const todoList = []

const addTodo = () => {
    const comment = document.getElementById('comment').value;
    document.getElementById('comment').value = '';
    createTodo(comment);
}

const createTodo = (comment) => {
    todoList.push({comment: comment, status: '作業中'});
    
    createTodoList();    
}

const deleteTodo = (todo) => {
    const tr = todo.parentNode;
    const index = tr.sectionRowIndex;
    tr.parentNode.deleteRow(index);
    todoList.splice(index, 1);
    
    createTodoList();
}

const createTodoList = () => {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    todoList.forEach((todo, index) => {
        const tr = document.createElement('tr');
    
        const tdId = document.createElement('td');
        tdId.innerHTML = index;
        
        const tdComment = document.createElement('td');
        tdComment.innerHTML = todo.comment;
        
        const tdStatus = document.createElement('td');
        createStatusButton(tdStatus, todo.status);

        const tdDelete = document.createElement('td');
        createDeleteButton(tdDelete);

        tr.appendChild(tdId);
        tr.appendChild(tdComment);
        tr.appendChild(tdStatus);
        tr.appendChild(tdDelete);

        tbody.appendChild(tr);
    });
}

const changeStatus = (todo) => {
    const tr = todo.parentNode;
    const index = tr.sectionRowIndex;
    const tdStatus = tr.cells[2];
    tdStatus.innerHTML = '';

    if (todoList[index].status === '作業中') {
        todoList[index].status = '完了';
        createStatusButton(tdStatus, '完了');
    } else {
        todoList[index].status = '作業中';        
        createStatusButton(tdStatus, '作業中');
    }
}
 
const createStatusButton = (td, status) => {
    const statusButton = document.createElement('button');
    statusButton.innerText = status;
    td.appendChild(statusButton);

    statusButton.addEventListener('click', () => {
        changeStatus(statusButton.parentNode);
    });
}

const createDeleteButton = (td) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '削除';
    td.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        deleteTodo(deleteButton.parentNode);
    });
}

document.getElementById('add-button').addEventListener('click', () => addTodo());