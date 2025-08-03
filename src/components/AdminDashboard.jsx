import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  Calendar,
  Mail,
  Phone,
  Briefcase,
  Star,
  User
} from 'lucide-react';

const AdminDashboard = ({ onNavigate }) => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  // 🔽 Fetch applicants from backend on mount
  useEffect(() => {
    fetch('http://localhost:8080/api/applicants')
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
        setFilteredApplicants(data); // Initialize visible list
      })
      .catch((err) => console.error('Error fetching applicants:', err));
  }, []);

  // 🔽 Update filtered list based on search or filter change
  useEffect(() => {
    let filtered = applicants;

    if (searchTerm) {
      filtered = filtered.filter((applicant) =>
        applicant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((applicant) =>
        applicant.positionType.toLowerCase().includes(filterType.toLowerCase())
      );
    }

    setFilteredApplicants(filtered);
  }, [applicants, searchTerm, filterType]);

  const getPositionBadgeColor = (positionType) => {
    if (positionType.toLowerCase().includes('internship')) {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-green-100 text-green-800';
  };

  const getExperienceBadgeColor = (experienceLevel) => {
    if (experienceLevel.includes('No Experience')) {
      return 'bg-gray-100 text-gray-800';
    } else if (experienceLevel.includes('Beginner')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (experienceLevel.includes('Intermediate')) {
      return 'bg-orange-100 text-orange-800';
    }
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-lg text-gray-600 mt-2">
                Manage applications and view applicant details
              </p>
            </div>
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{applicants.length}</span>
                <span className="text-gray-600 ml-2">Total Applicants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="all">All Positions</option>
                  <option value="internship">Internships</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants List */}
        {filteredApplicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
            <p className="text-gray-600">
              {applicants.length === 0
                ? 'No applications have been submitted yet.'
                : 'Try adjusting your search or filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {applicant.firstName} {applicant.lastName}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            <p><strong>Applied:</strong> {applicant.updatedAt ? new Date(applicant.updatedAt).toLocaleDateString() : 'Unknown'}</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{applicant.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{applicant.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{applicant.positionType}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{applicant.experienceLevel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPositionBadgeColor(applicant.positionType)}`}>
                      {applicant.positionType.includes('Internship') ? 'Internship' : 'Volunteer'}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getExperienceBadgeColor(applicant.experienceLevel)}`}>
                      {applicant.experienceLevel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
