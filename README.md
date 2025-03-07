---

# Task Management App

This is a task management application built using **React** for the frontend, **Django** for the backend, **PostgreSQL** for the database, and **Docker** to containerize the application.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup (React)](#frontend-setup-react)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Docker Setup](#docker-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)

## Tech Stack

- **Frontend**: React, JSX, CSS, Tailwind, DaisyUI, Axios
- **Backend**: Django, Django Rest Framework
- **Database**: PostgreSQL (in production and Docker setup)
- **Containerization**: Docker
- **Development Tools**: Docker Compose

## Features

- Create, update, and delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (Completed/Pending)
- User authentication (JWT-based)
- Responsive design

---

## Setup Instructions

### Frontend Setup (React)

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app/frontend
   ```

2. **Install dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed. Run the following command to install dependencies:

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the `frontend` directory and add the backend API URL. For local development:

   ```bash
   REACT_APP_API_URL=http://localhost:8000/api/
   ```

4. **Start the frontend development server**

   After installing the dependencies, run the following command to start the React development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

---

### Backend Setup (Django)

1. **Clone the repository**

   Navigate to the `backend` directory:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app/backend
   ```

2. **Create a virtual environment**

   Create and activate a virtual environment to isolate the project dependencies:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the dependencies**

   Make sure you have [Python 3.8+](https://www.python.org/) installed. Then, install the required dependencies using `pip`:

   ```bash
   pip install -r requirements.txt
   ```

4. **PostgreSQL Database Configuration**

   Update the `DATABASES` configuration in `settings.py` to use PostgreSQL:

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'task_db',
           'USER': 'task_user',
           'PASSWORD': 'password123',
           'HOST': 'db',  # Name of the Docker container
           'PORT': '5432',
       }
   }
   ```

   You'll also set up PostgreSQL in Docker (explained below).

5. **Create a superuser (optional)**

   You can create a superuser to access the Django admin panel:

   ```bash
   python manage.py createsuperuser
   ```

   Follow the prompts to set up the superuser account.

6. **Start the backend development server**

   Start the Django development server:

   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`.

---

### Docker Setup

Docker is used to containerize the app and manage dependencies in a more consistent environment. The following instructions set up both frontend and backend inside Docker containers.

1. **Create the `.env` file for the backend**

   Create a `.env` file inside the `backend` directory and add your environment variables, especially for PostgreSQL connection:

   ```bash
   DB_NAME=task_db
   DB_USER=task_user
   DB_PASSWORD=password123
   DB_HOST=db
   DB_PORT=5432
   ```

2. **Dockerize the Application**

   We will use **Docker Compose** to create the necessary services.

   1. **Dockerfile (Frontend)**

      Create a `Dockerfile` in the `frontend` directory:

      ```dockerfile
      # Frontend Dockerfile
      FROM node:16

      WORKDIR /app

      COPY package.json package-lock.json ./
      RUN npm install

      COPY . .

      CMD ["npm", "start"]
      ```

   2. **Dockerfile (Backend)**

      Create a `Dockerfile` in the `backend` directory:

      ```dockerfile
      # Backend Dockerfile
      FROM python:3.8-slim

      WORKDIR /app

      COPY requirements.txt .

      RUN pip install -r requirements.txt

      COPY . .

      CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
      ```

   3. **Docker Compose Configuration**

      Create a `docker-compose.yml` file in the root of your project:

      ```yaml
      version: '3'

      services:
        db:
          image: postgres:13
          environment:
            POSTGRES_DB: task_db
            POSTGRES_USER: task_user
            POSTGRES_PASSWORD: password123
          volumes:
            - postgres_data:/var/lib/postgresql/data
          networks:
            - task-net

        backend:
          build: ./backend
          command: ["python", "manage.py", "runserver", "0.0.0.0:8000"]
          volumes:
            - ./backend:/app
          environment:
            - DB_NAME=task_db
            - DB_USER=task_user
            - DB_PASSWORD=password123
            - DB_HOST=db
            - DB_PORT=5432
          ports:
            - "8000:8000"
          depends_on:
            - db
          networks:
            - task-net

        frontend:
          build: ./frontend
          volumes:
            - ./frontend:/app
          ports:
            - "3000:3000"
          depends_on:
            - backend
          networks:
            - task-net

      volumes:
        postgres_data:

      networks:
        task-net:
          driver: bridge
      ```

3. **Build and Run with Docker**

   From the root of your project directory, build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   The app will be accessible at:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8000`

---

## Running the Application

After setting up the Docker containers, you should be able to access the task management app by navigating to:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`

---

## API Endpoints

- **POST** `/api/tasks/` - Create a new task
- **GET** `/api/tasks/` - List all tasks
- **GET** `/api/tasks/{id}/` - Get a specific task
- **PUT** `/api/tasks/{id}/` - Update a specific task
- **DELETE** `/api/tasks/{id}/` - Delete a task

---

## Testing

To run the Django tests:

```bash
python manage.py test
```

To run React tests (if you have any):

```bash
npm test
```

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Open a Pull Request

---
