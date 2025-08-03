import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../Components/Card';
import { Calendar } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import './index.css';

const Semesters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [regulation, setRegulation] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [syllabusData, setSyllabusData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reg = params.get('regulation') || '';
    const uni = params.get('university') || '';
    const br = params.get('branch') || '';
    const yr = params.get('year') || '';

    setRegulation(reg);
    setUniversity(uni);
    setBranch(br);
    setYear(yr);

    if (reg && uni && br && yr) {
      fetch(API_ENDPOINTS.syllabus)
        .then(res => res.json())
        .then(data => {
          const yearData = data?.[reg]?.[uni]?.[br]?.[yr] || {};
          setSyllabusData(yearData);
          console.log(data)
        })
        .catch(err => {
          console.error('Error loading syllabus data:', err);
        });
    }
  }, [location]);

  // ✅ Use semester "1" and "2" for each year (to match your JSON)
  const getSemestersForYear = () => {
    return ["1", "2"];
  };

  const handleSemesterSelect = (semester) => {
    navigate(`/subjects?regulation=${regulation}&university=${university}&branch=${branch}&year=${year}&semester=${semester}`);
  };

  const handleSyllabusView = (semester) => {
    const semesterData = syllabusData?.[semester];
    const syllabusPdf = semesterData?.semesterSyllabus;

    if (syllabusPdf) {
      window.open(syllabusPdf, '_blank');
    } else {
      alert(`Syllabus PDF not found for Semester ${semester}`);
    }
  };

  const semesters = getSemestersForYear();

  return (
    <div className="semesterpage-root">
      <div className="semesterpage-bg">
        <div className="bg-dot dot1"></div>
        <div className="bg-dot dot2"></div>
      </div>

      <div className="semesterpage-header">
        <button className="semesterpage-back" onClick={() => navigate(-1)}>←</button>
        <div className="navbar-logo-header">
          <BookOpen className="w-6 h-6 text-cyan-400" onClick={() => navigate('/')} />
        </div>
      </div>

      <div className="semesterpage-main">
        <div className="semesterpage-titlebox">
          <h1>Select Semester</h1>
          <p>
            <span className="semesterpage-highlight">{regulation}</span> •
            <span className="semesterpage-highlight">{university}</span> •
            <span className="semesterpage-highlight">{branch}</span> •
            <span className="semesterpage-highlight">{year} Year</span>
          </p>
        </div>

        <div className="semesterpage-content">
          <div className="semesterpage-syllabus">
            <h2><span role="img" aria-label="file" className="semesterpage-fileicon">📄</span> Semester Syllabus</h2>
            <div className="semesterpage-syllabus-list">
              {semesters.map((sem) => (
                <Card
                  key={sem}
                  className="syllabus-card"
                  onClick={() => handleSyllabusView(sem)}
                >
                  <div className="syllabus-card-content">
                    <div>
                      <div className="syllabus-title">Semester {sem} Syllabus</div>
                      <div className="syllabus-desc">Complete syllabus for semester {sem}</div>
                    </div>
                    <span className="syllabus-download" role="img" aria-label="download">⬇️</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="semesterpage-semselect">
            <h2><span className="semesterpage-bar"></span> Choose Semester</h2>
            <div className="semesterpage-semgrid">
              {semesters.map((sem) => (
                <Card
                  key={sem}
                  className="sem-card"
                  onClick={() => handleSemesterSelect(sem)}
                >
                  <div className="sem-label">Semester {sem}</div>
                  <div className="sem-desc">{year} Year - Semester {sem}</div>
                  <button
                    className="sem-syllabus-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSyllabusView(sem);
                    }}
                  >
                    View Syllabus
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Semesters;
