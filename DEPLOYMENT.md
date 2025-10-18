# Deployment Guide

This guide will help you deploy the To-Do application to popular hosting platforms.

## Deployment Options

### Frontend Deployment

#### Netlify (Recommended for Frontend)
1. Create an account at [netlify.com](https://netlify.com)
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Navigate to the frontend directory: `cd frontend`
4. Run: `netlify deploy`
5. Follow the prompts to deploy your site
6. After deployment, update the API endpoint in your deployed frontend

#### Vercel (Alternative for Frontend)
1. Create an account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`
3. Navigate to the frontend directory: `cd frontend`
4. Run: `vercel`
5. Follow the prompts to deploy your site
6. After deployment, update the API endpoint in your deployed frontend

### Backend Deployment

#### Render (Recommended for Backend)
1. Create an account at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository or upload your code
4. Set the following configuration:
   - Build command: `npm install`
   - Start command: `node server.js`
   - Environment variables:
     - PORT: 3001 (or let Render assign one)
5. Deploy the service

#### Heroku (Alternative for Backend)
1. Create an account at [heroku.com](https://heroku.com)
2. Install the Heroku CLI
3. Login: `heroku login`
4. Navigate to the backend directory: `cd backend`
5. Create a new app: `heroku create`
6. Deploy: `git push heroku master`
7. Set environment variables if needed: `heroku config:set PORT=3001`

## Environment Variables

### Backend
- `PORT`: The port the server should listen on (default: 3001)
- `NODE_ENV`: Set to "production" for production deployments

### Frontend
After deploying your backend, you'll need to update the API endpoint in the frontend:
1. Open [script.js](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/todo-app/frontend/script.js)
2. Replace `YOUR_DEPLOYED_BACKEND_URL` with your actual backend URL

## Post-Deployment Steps

1. Update the API endpoint in the frontend JavaScript file
2. Test all functionality (create, read, update, delete tasks)
3. Verify both light and dark modes work correctly
4. Test on different devices and screen sizes
5. Update the live demo link in README.md with your actual deployment URL

## Troubleshooting

### CORS Issues
If you encounter CORS issues after deployment:
1. Ensure your backend server is configured to allow requests from your frontend domain
2. Update the CORS configuration in [server.js](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/todo-app/backend/server.js) if needed

### API Connection Issues
If the frontend can't connect to the backend:
1. Verify the backend URL is correct in [script.js](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/todo-app/frontend/script.js)
2. Check that the backend is running and accessible
3. Ensure proper environment variables are set

## Example Deployment Workflow

### Deploy Backend to Render
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect to your GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Deploy and note the deployed URL

### Deploy Frontend to Netlify
1. Update the API endpoint in [script.js](file:///c%3A/Users/daksh/Desktop/alexa%20new%20full%20stack%20sumission/todo-app/frontend/script.js) with your Render backend URL
2. Run `netlify deploy` from the frontend directory
3. Choose to deploy as a static site
4. Note the deployed frontend URL

### Final Testing
1. Visit your deployed frontend URL
2. Test creating a new task
3. Verify the task appears in the list
4. Test completing and deleting tasks
5. Test theme switching between light and dark modes