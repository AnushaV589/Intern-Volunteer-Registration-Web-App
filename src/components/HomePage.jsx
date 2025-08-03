import React from 'react';
import { ArrowRight, Users, Award, Target, CheckCircle } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: Users,
      title: 'Internship Program',
      description: 'Gain hands-on experience working alongside industry professionals and build your career foundation.'
    },
    {
      icon: Award,
      title: 'Volunteer Opportunities', 
      description: 'Make a meaningful impact in your community while developing valuable skills and connections.'
    },
    {
      icon: Target,
      title: 'Professional Growth',
      description: 'Access mentorship, training programs, and career development resources to advance your goals.'
    }
  ];

  const benefits = [
    'Real-world project experience',
    'Mentorship from industry experts',
    'Networking opportunities',
    'Skill development workshops',
    'Certificate of completion'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Launch Your Career
              <span className="block text-blue-200">With Purpose</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join our internship and volunteer programs to gain real-world experience, 
              build meaningful connections, and make a positive impact.
            </p>
            <button
              onClick={() => onNavigate('register')}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Opportunities That Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse programs designed to match your interests and career goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const { icon: Icon, title, description } = feature;
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Join Our Programs?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our programs are designed to provide you with practical experience and the tools 
                you need to succeed in your chosen field.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Take the first step towards your professional journey. Our application process 
                is quick and straightforward.
              </p>
              <button
                onClick={() => onNavigate('register')}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Start Your Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Our Programs?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're here to help you find the perfect opportunity that matches your goals and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('register')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Apply Today
            </button>
            {/* <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Contact Us
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;