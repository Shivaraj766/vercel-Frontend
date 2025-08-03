import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {BookOpen} from 'lucide-react'
import Card from '../../Components/Card';
import './index.css';

const branches = [
  { code: 'CSE', name: 'Computer Science & Engineering' },
  { code: 'ECE', name: 'Electronics & Communication Engineering' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering' },
  { code: 'MECH', name: 'Mechanical Engineering' },
  { code: 'CE', name: 'Civil Engineering' }
];

const Branches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [regulation, setRegulation] = useState('');
  const [university, setUniversity] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRegulation(params.get('regulation') || '');
    setUniversity(params.get('university') || '');
  }, [location]);

  const handleBranchSelect = (branchCode) => {
    navigate(`/years?regulation=${regulation}&university=${university}&branch=${branchCode}`);
  };

  return (
    <div className="branchpage-root">
      {/* Animated Background */}
      <div className="branchpage-bg">
        <div className="bg-dot dot1"></div>
        <div className="bg-dot dot2"></div>
        <div className="bg-dot dot3"></div>
      </div>

      {/* Header */}
      <div className="branchpage-header">
        <button className="branchpage-back" onClick={() => navigate('/')}>
          ← 
        </button>
        <div className="navbar-logo-header">
            <BookOpen className="w-6 h-6 text-cyan-400" onClick={() => navigate('/')}/>
            </div>
          </div>

      {/* Main Content */}
      <div className="branchpage-main">
        <div className="branchpage-titlebox">
          <h1>Select Branch</h1>
          <p>
            <span className="branchpage-highlight">{regulation}</span>
            {' • '}
            <span className="branchpage-highlight">{university}</span>
          </p>
        </div>
        <div className="branchpage-grid">
          {branches.map((branch, index) => (
            <Card
              key={branch.code}
              className="branch-card"
              onClick={() => handleBranchSelect(branch.code)}
            >
              <div className="branch-code">{branch.code}</div>
              <div className="branch-name">{branch.name}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;