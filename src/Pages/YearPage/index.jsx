import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../Components/Card';
import { BookOpen } from 'lucide-react';
import './index.css';

const years = [
  { year: '1st Year', value: '1' },
  { year: '2nd Year', value: '2' },
  { year: '3rd Year', value: '3' },
  { year: '4th Year', value: '4' }
];

const Years = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [regulation, setRegulation] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRegulation(params.get('regulation') || '');
    setUniversity(params.get('university') || '');
    setBranch(params.get('branch') || '');
  }, [location]);

  const handleYearSelect = (yearValue) => {
    navigate(`/semesters?regulation=${regulation}&university=${university}&branch=${branch}&year=${yearValue}`);
  };

  return (
    <div className="yearpage-root">
      {/* Animated Background */}
      <div className="yearpage-bg">
        <div className="bg-dot dot1"></div>
        <div className="bg-dot dot2"></div>
      </div>

      {/* Header */}
      <div className="yearpage-header">
        <button className="yearpage-back" onClick={() => navigate(-1)}>
          ← 
        </button>
         <div className="navbar-logo-header">
            <BookOpen className="w-6 h-6 text-cyan-400" onClick={() => navigate('/')}/>
            </div>
          </div>

      {/* Main Content */}
      <div className="yearpage-main">
        <div className="yearpage-titlebox">
          <h1>Select Academic Year</h1>
          <p>
            <span className="yearpage-highlight">{regulation}</span> • 
            <span className="yearpage-highlight">{university}</span> • 
            <span className="yearpage-highlight">{branch}</span>
          </p>
        </div>
        <div className="yearpage-grid">
          {years.map((yearItem) => (
            <Card
              key={yearItem.value}
              className="year-card"
              onClick={() => handleYearSelect(yearItem.value)}
            >
              <div className="year-label">{yearItem.year}</div>
              <div className="year-desc">Academic Year</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Years;