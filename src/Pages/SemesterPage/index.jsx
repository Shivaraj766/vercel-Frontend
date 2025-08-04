import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../Components/Card';
import { Calendar, BookOpen } from 'lucide-react';
import { apiService } from '../../config/api';
import ErrorBoundary from '../../Components/ErrorBoundary';
import './index.css';

const Semesters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [regulation, setRegulation] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use ref to track if component is mounted
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Reset mounted flag when component mounts
    isMountedRef.current = true;
    
    // Cleanup function to set mounted flag to false
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reg = params.get('regulation') || '';
    const uni = params.get('university') || '';
    const br = params.get('branch') || '';
    const yr = params.get('year') || '';

    // Only update state if component is still mounted
    if (!isMountedRef.current) return;

    setRegulation(reg);
    setUniversity(uni);
    setBranch(br);
    setYear(yr);
    setError(null);

    if (reg && uni && br && yr) {
      setLoading(true);
      console.log('🔍 Fetching data for:', { reg, uni, br, yr });
      
      // Use the optimized API service
      apiService.getSyllabusData()
        .then(data => {
          // Only update state if component is still mounted
          if (!isMountedRef.current) return;
          
          console.log('📚 Full API response received');
          const yearData = data?.[reg]?.[uni]?.[br]?.[yr] || {};
          console.log('📖 Extracted year data:', yearData);
          setSyllabusData(yearData);
          setLoading(false);
        })
        .catch(err => {
          // Only update state if component is still mounted
          if (!isMountedRef.current) return;
          
          console.error('❌ Error loading syllabus data:', err);
          setError(err.message || 'Failed to load data. Please try again.');
          setLoading(false);
        });
    }
  }, [location]);

  // ✅ Use semester "1" and "2" for each year (to match your JSON)
  const getSemestersForYear = () => {
    return ["1", "2"];
  };

  const handleSemesterSelect = (semester) => {
    try {
      navigate(`/subjects?regulation=${regulation}&university=${university}&branch=${branch}&year=${year}&semester=${semester}`);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Navigation failed. Please try again.');
    }
  };

  const handleSyllabusView = (semester) => {
    try {
      const semesterData = syllabusData?.[semester];
      const syllabusPdf = semesterData?.semesterSyllabus;

      if (syllabusPdf) {
        window.open(syllabusPdf, '_blank');
      } else {
        alert(`Syllabus PDF not found for Semester ${semester}`);
      }
    } catch (err) {
      console.error('Syllabus view error:', err);
      setError('Failed to open syllabus. Please try again.');
    }
  };

  const semesters = getSemestersForYear();

  // Show loading state with progress indicator
  if (loading) {
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
            <h1>🔄 Loading Semesters...</h1>
            <p>Fetching semester data from server...</p>
            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '3px solid #333',
                borderTop: '3px solid #00ffff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <span>This may take a moment if the server is starting up...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
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
            <h1>Error</h1>
            <p style={{ color: '#ff6b6b' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#00ffff', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

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

// Wrap the component with ErrorBoundary
const SemestersWithErrorBoundary = () => (
  <ErrorBoundary isPageLevel={true}>
    <Semesters />
  </ErrorBoundary>
);

export default SemestersWithErrorBoundary;
