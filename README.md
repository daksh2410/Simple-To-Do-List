# Simple Full-Stack To-Do App

A clean, submission-ready full-stack To-Do application with a frontend built with HTML/CSS/JavaScript and a backend built with Node.js/Express. Tasks are stored in a JSON file for persistent storage.

## Features

- Create, Read, Update, and Delete tasks
- Mark tasks as complete/incomplete
- Filter tasks (All, Active, Completed)
- Timestamps for creation and update times
- Responsive design
- Basic error handling

## Project Structure

```
todo-app/
├── backend/
│   ├── package.json         # Backend dependencies
│   ├── server.js            # Main server file with API endpoints
│   └── tasks.json           # Persistent storage for tasks
└── frontend/
    ├── index.html           # Main HTML file
    ├── styles.css           # Styling
    ├── script.js            # Frontend logic
    ├── server.js            # Frontend server
    └── package.json         # Frontend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

   The backend server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend server:
   ```
   npm start
   ```

4. Open your browser and navigate to http://localhost:3000

## API Endpoints

- `POST /tasks` - Create a task with title and completed status
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task by ID
- `PUT /tasks/:id` - Update a task's title or completed status
- `DELETE /tasks/:id` - Delete a task by ID

## Data Model

Each task has the following properties:
- `id` - Unique identifier
- `title` - Task description
- `completed` - Boolean status
- `createdAt` - Timestamp when task was created
- `updatedAt` - Timestamp when task was last updated

## Development

To modify the application:

1. Backend changes: Modify files in the [backend/](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/simple-todo-app/backend) directory
2. Frontend changes: Modify files in the [frontend/](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/simple-todo-app/frontend) directory

## Viva Preparation

Key points for your viva:
1. The application uses a simple file-based storage system (tasks.json) instead of a database
2. All API endpoints follow REST conventions
3. The frontend is built with vanilla HTML, CSS, and JavaScript (no frameworks)
4. Error handling is implemented for common scenarios
5. The project structure is kept simple and easy to understand
6. Tasks include timestamps for creation and updates
7. The application can be run locally with simple npm commands

## Deployment

For deployment, you can:
1. Deploy the backend to services like Render or Heroku
2. Deploy the frontend to services like Netlify or Vercel

Remember to update the API endpoint URL in the frontend [script.js](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/todo-app/frontend/script.js) file if deploying to different domains.

### Live Demo

A live demo of this application is available at: [https://todo-app-demo.netlify.app](https://todo-app-demo.netlify.app) *(Note: This is a placeholder link. Replace with your actual deployment URL when deployed)*