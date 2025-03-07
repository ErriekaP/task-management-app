---

# Task Management App

This is a task management application built using **React** for the frontend and **Django** for the backend. It allows users to create, update, delete, and manage tasks effectively.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup (React)](#frontend-setup-react)
  - [Backend Setup (Django)](#backend-setup-django)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)

## Tech Stack

- **Frontend**: React, JSX, Tailwind, DaisyUI, CSS, Axios
- **Backend**: Django, Django Rest Framework
- **Database**: SQLite (for development), PostgreSQL (production)

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

4. **Set up the database**

   Run the following command to set up the database and apply migrations:

   ```bash
   python manage.py migrate
   ```

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

## Running the Application

1. **Start the backend**

   Navigate to the `backend` directory and run:

   ```bash
   python manage.py runserver
   ```

2. **Start the frontend**

   Navigate to the `frontend` directory and run:

   ```bash
   npm start
   ```

Now, you should be able to access the task management app by navigating to `http://localhost:3000` in your browser.

---

## API Endpoints

- **POST** `/api/tasks/` - Create a new task
- **GET** `/api/tasks/` - List all tasks
- **GET** `/api/tasks/{id}/` - Get a specific task
- **PUT** `/api/tasks/{id}/` - Update a specific task
- **DELETE** `/api/tasks/{id}/` - Delete a task

---

## Testing

To run the Django tests, use the following command:

```bash
python manage.py test
```

To run React tests (if you have any), use:

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

Feel free to reach out if you have any questions or run into issues!

---

