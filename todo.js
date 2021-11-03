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

        if (todo.status === '作業中') {
            tr.classList.add('todo-working');
            //tr.classList.add('todo-working').style.display = '';
            //tr.classList.add('todo-done').style.display = 'none';
        } else if (todo.status === '完了'){
            tr.classList.add('todo-done');
        }
        
        tbody.appendChild(tr);
    });

    const radioGroup = document.getElementsByName('radio-group');
    radioGroup.forEach((radio) => {
        if (radio.checked) {
            switchTodoList(radio);
        }
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
        tr.classList.replace('todo-working', 'todo-done');
        console.log(tr);
    } else {
        todoList[index].status = '作業中';        
        createStatusButton(tdStatus, '作業中');
        tr.classList.replace('todo-done', 'todo-working');
        console.log(tr);
    }

    const radioGroup = document.getElementsByName('radio-group');
    radioGroup.forEach((radio) => {
        if (radio.checked) {
            switchTodoList(radio);
        }
    });
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

const switchTodoList = (radio) => {
    const value = radio.value;

    const todoWorking = document.getElementsByClassName('todo-working');
    const todoDone = document.getElementsByClassName('todo-done');

    if(value === 'all') {        
        for (let i = 0; i < todoWorking.length; i += 1 ){
            todoWorking[i].style.display = '';
        }       
        for (let i = 0; i < todoDone.length; i += 1 ){
            todoDone[i].style.display = '';
        }
    } else if(value === 'working') {
        for (let i = 0; i < todoWorking.length; i += 1 ){
            todoWorking[i].style.display = '';
        }        
        for (let i = 0; i < todoDone.length; i += 1 ){
            todoDone[i].style.display = 'none';
        }
    } else if(value === 'done') {
        for (let i = 0; i < todoWorking.length; i += 1 ){
            todoWorking[i].style.display = 'none';
        }        
        for (let i = 0; i < todoDone.length; i += 1 ){
            todoDone[i].style.display = '';
        }
    }
}

document.getElementById('add-button').addEventListener('click', () => addTodo());

window.onload = () => {
    const radioGroup = document.getElementsByName('radio-group');
    
    radioGroup.forEach((radio) => {
        radio.addEventListener('click', () => switchTodoList(radio));
    });
}