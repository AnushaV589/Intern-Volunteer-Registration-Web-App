# Registration Management System

A full-stack web application for managing internship and volunteer applications.

## Frontend (React)
- Modern React application with professional design
- Registration form with validation
- Admin dashboard for managing applications
- Responsive design optimized for all devices

## Backend (Spring Boot)
- RESTful API with comprehensive CRUD operations
- MySQL database integration
- Input validation and error handling
- Cross-origin resource sharing (CORS) support

## Setup Instructions

### Frontend Setup
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. The React app will run on http://localhost:5173

### Backend Setup
1. Ensure MySQL is running on localhost:3306
2. Create database: `CREATE DATABASE registration_db;`
3. Navigate to backend directory: `cd backend`
4. Run the Spring Boot application: `./mvnw spring-boot:run`
5. The API will be available at http://localhost:8080

## API Endpoints

- `POST /api/applicants` - Create new applicant
- `GET /api/applicants` - Get all applicants
- `GET /api/applicants/{id}` - Get applicant by ID
- `GET /api/applicants/search?q={term}` - Search applicants
- `GET /api/applicants/position/{type}` - Get applicants by position type
- `PUT /api/applicants/{id}` - Update applicant
- `DELETE /api/applicants/{id}` - Delete applicant
- `GET /api/applicants/statistics` - Get application statistics

## Features

- **Registration Form**: Collects first name, last name, email, phone, position type, and experience level
- **Admin Dashboard**: View, search, and filter applications
- **Validation**: Comprehensive input validation on both frontend and backend
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Technologies Used

### Frontend
- React 18
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

### Backend
- Spring Boot 3.2
- Spring Data JPA
- Spring Web
- MySQL
- Lombok
- Bean Validation