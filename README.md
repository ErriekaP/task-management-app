

# Task Management App

This is a task management application built using **React** for the frontend, **Django** for the backend, **PostgreSQL** for the database, and **Docker** to containerize the application. The app is styled using **TailwindCSS** and utilizes **DaisyUI** for pre-designed UI components.

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
- [Architecture and Design Choices](#architecture-and-design-choices)

## Tech Stack

- **Frontend**: React, JSX, CSS, Axios
- **Backend**: Django, Django Rest Framework
- **Database**: PostgreSQL (in production and Docker setup)
- **Containerization**: Docker
- **Development Tools**: Docker Compose
- **Styling**: TailwindCSS, DaisyUI

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

Docker is used to containerize the application, making it easy to deploy and manage. The following instructions set up both frontend and backend inside Docker containers.

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

   - Frontend: `http://localhost:3000`
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

## Architecture and Design Choices

The **Task Management App** is built using a modern full-stack architecture, integrating **React** on the frontend, **Django** with the **Django Rest Framework (DRF)** on the backend, and **PostgreSQL** as the database. This architecture ensures scalability, maintainability, and flexibility, while providing a rich, responsive user interface. Docker is used to containerize the application, providing a consistent development and production environment.

### Frontend: React with TailwindCSS and DaisyUI

React is chosen for the frontend due to its component-based architecture, which allows for reusable UI components and a seamless user experience. React's state management and virtual DOM make it ideal for building dynamic, high-performance web applications. In this app, React handles the user interface, with components for creating, updating, and displaying tasks.

**TailwindCSS** is used for styling the application due to its utility-first approach, which promotes flexibility and rapid UI development. It allows developers to build custom designs by composing utility classes directly in HTML, making it easy to apply styles and maintain consistency throughout the app. TailwindCSS is also highly configurable, which ensures that the app’s design can be easily adjusted as the requirements evolve.

**DaisyUI**, a component library built on top of TailwindCSS, is utilized to speed up development by providing pre-designed, accessible, and customizable UI components such as buttons, forms, modals, and cards. This helps maintain a consistent, polished look across the application while reducing the need for repetitive design work. DaisyUI's design system aligns well with the modern, clean aesthetic that the app aims for.

### Backend: Django and Django Rest Framework (DRF)

Django is used for the backend because it is a robust, secure, and scalable web framework that follows the **MTV (Model-Template-View)** architecture pattern. Django provides built-in features like authentication, form handling, and admin management, which speeds up development. The **Django Rest Framework (DRF)** is used to build the RESTful API that communicates with the frontend. DRF simplifies the creation of API endpoints by providing tools for serialization, validation, and authentication.

PostgreSQL is chosen as the database due to its reliability, scalability, and support for advanced data types and operations. It ensures that the app can handle complex queries and large datasets efficiently, making it a solid choice for production-grade applications. The database is set up to store user information and task data, with relationships between tasks and users being well-defined.

### Docker for Containerization

Docker is used to containerize the application, making it easy to deploy and manage. Using **Docker Compose**, both the backend (Django) and frontend (React) services, along with the PostgreSQL database, can be spun up with a single command. Docker ensures that the application behaves the same across different environments (local, development, and production), thus eliminating the "works on my machine" problem. Additionally, Docker makes scaling, testing, and deployment easier by providing a consistent containerized environment.

### Conclusion

This architecture balances flexibility, performance, and scalability. The combination of React with TailwindCSS and DaisyUI ensures a responsive and modern frontend, while Django and DRF provide a solid backend that integrates seamlessly with PostgreSQL. Docker enables a smooth deployment process, making it easy to manage the entire stack in a containerized environment. These choices allow for a maintainable, scalable, and visually appealing task management application. 

---
