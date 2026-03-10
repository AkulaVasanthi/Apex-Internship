// script.js

function addTask() {
    const input = document.getElementById('taskInput');
    const todoList = document.querySelector('#todo .task-list');
    const errorMsg = document.getElementById('errorMsg');

    // Step 2: Validation
    if (input.value.trim() === "") {
        errorMsg.innerText = "Task cannot be empty!";
        return;
    } else {
        errorMsg.innerText = ""; // Clear error
    }

    // Step 4: Create Dynamic Element
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    
    // Using innerHTML to add text and a button
    taskCard.innerHTML = `
        <p>${input.value}</p>
        <button class="move-btn" onclick="moveTask(this)">Move Next &rarr;</button>
    `;

    // Append to To-Do column
    todoList.appendChild(taskCard);

    // Clear input
    input.value = "";
}

function moveTask(button) {
    const card = button.parentElement;
    const currentColumnId = card.parentElement.parentElement.id;
    
    const inProgressList = document.querySelector('#inprogress .task-list');
    const doneList = document.querySelector('#done .task-list');

    if (currentColumnId === 'todo') {
        // Move to In Progress
        inProgressList.appendChild(card);
    } else if (currentColumnId === 'inprogress') {
        // Move to Done
        doneList.appendChild(card);
        button.innerText = "Remove"; // Change button text
        button.style.background = "#e74c3c";
    } else {
        // Delete from Done
        card.remove();
    }
}