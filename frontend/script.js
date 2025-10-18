// API base URL
// For local development, use localhost
// For production, use the deployed backend URL
// Hardcoded for production deployment
const API_BASE_URL = 'https://simple-to-do-list-34ul.onrender.com';

// Debug: Log the API base URL to verify it's correct
console.log('API_BASE_URL is set to:', API_BASE_URL);
if (API_BASE_URL.includes('YOUR_DEPLOYED_BACKEND_URL')) {
  console.error('ERROR: API_BASE_URL still contains placeholder!');
}

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');
const showAllBtn = document.getElementById('show-all');
const showActiveBtn = document.getElementById('show-active');
const showCompletedBtn = document.getElementById('show-completed');
const messageContainer = document.getElementById('message-container');
const themeToggle = document.getElementById('theme-toggle');

// State
let tasks = [];
let currentFilter = 'all';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Window hostname:', window.location.hostname);
    console.log('API_BASE_URL:', API_BASE_URL);
    loadTasks();
    initTheme();
});
taskForm.addEventListener('submit', handleFormSubmit);
showAllBtn.addEventListener('click', () => setFilter('all'));
showActiveBtn.addEventListener('click', () => setFilter('active'));
showCompletedBtn.addEventListener('click', () => setFilter('completed'));
themeToggle.addEventListener('click', toggleTheme);

// Load tasks from backend
async function loadTasks() {
    try {
        const url = `${API_BASE_URL}/tasks`;
        console.log('Fetching tasks from:', url);
        const response = await fetch(url);
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error(`Failed to load tasks. Status: ${response.status}`);
        
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError(`Failed to load tasks. Please make sure the backend is running. Error: ${error.message}`);
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = taskTitleInput.value.trim();
    
    if (!title) {
        showError('Please enter a task title');
        return;
    }
    
    try {
        const url = `${API_BASE_URL}/tasks`;
        console.log('Creating task at:', url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        if (!response.ok) throw new Error('Failed to create task');
        
        const newTask = await response.json();
        tasks.unshift(newTask); // Add to beginning of array
        
        renderTasks();
        taskForm.reset();
        showSuccess('Task created successfully!');
    } catch (error) {
        console.error('Error creating task:', error);
        showError('Failed to create task. Please try again.');
    }
}

// Toggle task completion status
async function toggleComplete(id, completed) {
    try {
        const url = `${API_BASE_URL}/tasks/${id}`;
        console.log('Updating task at:', url);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !completed })
        });
        
        if (!response.ok) throw new Error('Failed to update task');
        
        const updatedTask = await response.json();
        
        // Update task in array
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks[index] = updatedTask;
        }
        
        renderTasks();
        showSuccess(completed ? 'Task marked as active!' : 'Task marked as completed!');
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task. Please try again.');
    }
}

// Delete a task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const url = `${API_BASE_URL}/tasks/${id}`;
        console.log('Deleting task at:', url);
        const response = await fetch(url, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete task');
        
        // Remove task from array
        tasks = tasks.filter(task => task.id !== id);
        
        renderTasks();
        showSuccess('Task deleted successfully!');
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task. Please try again.');
    }
}

// Set current filter and re-render
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active button
    showAllBtn.classList.toggle('active', filter === 'all');
    showActiveBtn.classList.toggle('active', filter === 'active');
    showCompletedBtn.classList.toggle('active', filter === 'completed');
    
    renderTasks();
}

// Filter tasks based on current filter
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Render tasks to the DOM
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        let emptyMessage = '';
        switch(currentFilter) {
            case 'active':
                emptyMessage = 'No active tasks found. Great job!';
                break;
            case 'completed':
                emptyMessage = 'No completed tasks yet. Keep going!';
                break;
            default:
                emptyMessage = 'No tasks found. Add a new task to get started!';
        }
        taskList.innerHTML = `
            <li class="empty-state">
                <h3><i class="fas fa-clipboard-list"></i></h3>
                <h3>No Tasks Found</h3>
                <p>${emptyMessage}</p>
            </li>
        `;
        return;
    }
    
    taskList.innerHTML = filteredTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-header">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
                <div class="task-actions">
                    <button class="action-btn complete-btn" onclick="toggleComplete('${task.id}', ${task.completed})">
                        <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i> ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTask('${task.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div class="timestamps">
                <div class="timestamp-item">
                    <i class="fas fa-calendar-plus"></i>
                    <span>Created: ${new Date(task.createdAt).toLocaleString()}</span>
                </div>
                <div class="timestamp-item">
                    <i class="fas fa-history"></i>
                    <span>Updated: ${new Date(task.updatedAt).toLocaleString()}</span>
                </div>
            </div>
        </li>
    `).join('');
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Show error message
function showError(message) {
    messageContainer.textContent = message;
    messageContainer.className = 'message error';
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageContainer.className = 'message error hidden';
    }, 5000);
}

// Show success message
function showSuccess(message) {
    messageContainer.textContent = message;
    messageContainer.className = 'message success';
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageContainer.className = 'message success hidden';
    }, 3000);
}