# 🎓 Registration Management System

A full-stack web application to manage **internship** and **volunteer** applications with a modern frontend and a robust backend.

---

## 📁 Project Structure

registration-management/
│
├── backend/ # Spring Boot Application
│ ├── src/
│ ├── pom.xml
│ └── application.properties
│
├── frontend/ # React Application
│ ├── components/
│ │ ├── AdminDashboard.jsx
│ │ ├── HomePage.jsx
│ │ ├── Navigation.jsx
│ │ └── RegistrationForm.jsx
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ ├── vite.config.ts
│ ├── tsconfig.json
│ ├── package.json
│ └── index.html

---

## 🚀 Features

### 📝 Registration Form
- Collects applicant details:
  - First name, last name, email, phone
  - Type (Internship or Volunteer)
  - Experience level
  - Skills, University, Graduation year
  - Motivation, Availability, Organization

### 🛠 Admin Dashboard
- View, filter, and manage applicants
- View applicant details and remove entries
- Displays total applicants, with formatted submission date

### 💡 Others
- Full CRUD operations
- Frontend form validation
- Backend validation and error handling
- Responsive design (desktop/mobile/tablet)

---

## 🧑‍💻 Technologies Used

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Vite

### Backend
- Spring Boot 3.2
- Spring Data JPA
- MySQL
- Lombok
- Bean Validation (Jakarta)

---

## ⚙️ Setup Instructions

### 1. Backend (Spring Boot)

#### 📌 Prerequisites
- Java 17+
- Maven
- MySQL running on `localhost:3306`

#### 🛠 Steps

# Step into the backend folder
cd backend

# Create the MySQL database
mysql -u root -p
CREATE DATABASE registration_db;

# Run the backend
./mvnw spring-boot:run
📍 The backend will be available at: http://localhost:8080

2. Frontend (React + Vite)
📌 Prerequisites
Node.js 18+

npm

🛠 Steps
# Step into the frontend folder
cd frontend

# Install dependencies
npm install

# Run the frontend
npm run dev
📍 The frontend will be available at: http://localhost:5173

📡 API Endpoints
Base URL: http://localhost:8080/api/applicants
Method	Endpoint	Description
POST	/	Create new applicant
GET	/	Get all applicants
GET	/{id}	Get applicant by ID
GET	/search?q={term}	Search applicants by name or email
GET	/position/{type}	Filter applicants by position type
PUT	/{id}	Update applicant
DELETE	/{id}	Delete applicant
GET	/statistics	Get total applicant count

📷 Screenshots
Add relevant screenshots of your dashboard and registration form here.

✨ Credits
Developed by Vanapalli Anusha

🌐 Portfolio

💼 LinkedIn

📧 anushavanapalli035@gmail.com
