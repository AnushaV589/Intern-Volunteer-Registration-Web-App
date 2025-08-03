import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [applicants, setApplicants] = useState([]);

  const handleRegistrationSubmit = async (formData) => {
    try {
      // This would connect to your Spring Boot backend at http://localhost:8080
      const response = await fetch('http://localhost:8080/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const newApplicant = await response.json();
        setApplicants(prev => [...prev, newApplicant]);
        return { success: true, message: 'Application submitted successfully!' };
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      return { success: false, message: 'Failed to submit application. Please try again.' };
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegistrationForm onSubmit={handleRegistrationSubmit} onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard applicants={applicants} onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;