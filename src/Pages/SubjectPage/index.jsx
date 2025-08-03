import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../Components/Card';
import { BookOpen } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import './index.css';

const Subjects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [regulation, setRegulation] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Update state from query params AND fetch data after state is set
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const reg = params.get('regulation') || '';
    const uni = params.get('university') || '';
    const br = params.get('branch') || '';
    const yr = params.get('year') || '';
    const sem = params.get('semester') || '';

    setRegulation(reg);
    setUniversity(uni);
    setBranch(br);
    setYear(yr);
    setSemester(sem);

    // ✅ Only fetch if all params are valid
    if (reg && uni && br && yr && sem) {
      fetchSubjects(reg, uni, br, yr, sem);
    } else {
      console.warn('⚠️ Missing parameters:', { regulation: reg, university: uni, branch: br, year: yr, semester: sem });
      setLoading(false);
    }
  }, [location]);

  // 📥 Fetch subjects based on resolved path in JSON
  const fetchSubjects = async (reg, uni, br, yr, sem) => {
    try {
      const response = await fetch(API_ENDPOINTS.syllabus);
      const data = await response.json();

      console.log('✅ Full syllabus JSON:', data);

      const semesterData = data?.[reg]?.[uni]?.[br]?.[yr]?.[sem]?.subjects;
      console.log('📘 Extracted semesterData:', semesterData);

      const subjectsList = semesterData || [];
      console.log('📚 Subjects found:', subjectsList);

      setSubjects(subjectsList);
    } catch (error) {
      console.error('❌ Error loading subjects:', error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subjectName) => {
    navigate(
      `/units?regulation=${regulation}&university=${university}&branch=${branch}&year=${year}&semester=${semester}&subject=${encodeURIComponent(
        subjectName
      )}`
    );
  };

  if (loading) {
    return (
      <div className="subjectpage-root">
        <div className="subjectpage-main">
          <div className="loading-message" style={{ color: '#22d3ee', textAlign: 'center', fontSize: '1.2rem' }}>
            Loading subjects...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subjectpage-root">
      {/* Animated Background */}
      <div className="subjectpage-bg">
        <div className="bg-dot dot1"></div>
        <div className="bg-dot dot2"></div>
      </div>

      {/* Header */}
      <div className="subjectpage-header">
        <button className="subjectpage-back" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="navbar-logo-header">
          <BookOpen className="w-6 h-6 text-cyan-400" onClick={() => navigate('/')} />
        </div>
      </div>

      {/* Main Content */}
      <div className="subjectpage-main">
        <div className="subjectpage-titlebox">
          <h1>Subject List</h1>
          <p>
            <span className="subjectpage-highlight">{regulation}</span> •
            <span className="subjectpage-highlight">{university}</span> •
            <span className="subjectpage-highlight">{branch}</span> •
            <span className="subjectpage-highlight">{year} Year</span> •
            <span className="subjectpage-highlight">Semester {semester}</span>
          </p>
        </div>

        <div className="subjectpage-grid">
          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <Card key={index} className="subject-card" onClick={() => handleSubjectSelect(subject.name)}>
                <div className="subject-card-content">
                  <div className="subject-index">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="subject-code">{subject.name}</div>
                    <div className="subject-name">
                      {subject.unitNames ? `${subject.unitNames.length} Units Available` : 'Coming Soon'}
                    </div>
                    <div className="subject-desc">Click to view units</div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="no-subjects" style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#d1d5db' }}>
              No subjects available for this combination
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
