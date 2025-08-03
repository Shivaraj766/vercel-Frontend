import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import allSubjectsData from './all_subjects_data.json';
import './index.css';

const ViewAllSubjects = ({ 
  isOpen, 
  onClose, 
  onSubjectSelect, 
  regulation, 
  university, 
  branch, 
  year, 
  semester 
}) => {
  const navigate = useNavigate();
  const [allSubjects, setAllSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Get subjects based on university from the JSON data
  const getSubjectsByUniversity = (universityName) => {
    const universityKey = universityName?.toUpperCase();
    if (universityKey && allSubjectsData[universityKey]) {
      return allSubjectsData[universityKey];
    }
    return [];
  };

  // Load subjects data from JSON file based on university
  const loadSubjectsData = () => {
    try {
      setLoading(true);
      const subjects = getSubjectsByUniversity(university);
      setAllSubjects(subjects);
    } catch (error) {
      console.error('Error loading subjects data:', error);
      setAllSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && university) {
      loadSubjectsData();
    }
  }, [isOpen, university]);

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  const handleSubjectClick = (selectedSubject) => {
    // Directly open the Google Drive folder in a new tab
    if (selectedSubject.driveFolder) {
      window.open(selectedSubject.driveFolder, '_blank');
    } else {
      alert('No Google Drive folder available for this subject');
    }
    handleClose();
  };

  const filteredSubjects = allSubjects.filter(subject => {
    const subjectName = subject.name || '';
    return subjectName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="subject-popup-overlay" onClick={handleClose}>
      <div className="subject-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="subject-popup-header">
          <h2>All Subjects {university}</h2>
          <button className="popup-close-btn" onClick={handleClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="subject-search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="subject-search-input"
          />
        </div>

        <div className="subject-popup-content">
          {loading ? (
            <div className="loading-message" style={{ textAlign: 'center', padding: '2rem' }}>
              Loading subjects...
            </div>
          ) : (
            <div className="subjects-grid">
              {filteredSubjects.map((subjectItem, index) => (
                <div
                  key={index}
                  className="subject-item"
                  onClick={() => handleSubjectClick(subjectItem)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="subject-item-header">
                    <h3>{subjectItem.name || subjectItem}</h3>
                    {subjectItem.driveFolder && (
                      <span className="subject-drive-link">📁 <a>Click Here</a></span>
                    )}
                  </div>
                  <div className="subject-item-arrow">→</div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredSubjects.length === 0 && (
            <div className="no-subjects-found">
              <p>No subjects found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllSubjects;
