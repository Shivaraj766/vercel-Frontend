import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../Components/Card';
import ViewAllSubjects from '../ViewAllSubjects';
import { BookOpen, FileText, Download, List } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import './index.css';


const Units = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [regulation, setRegulation] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [unitNames, setUnitNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubjectPopup, setShowSubjectPopup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRegulation(params.get('regulation') || '');
    setUniversity(params.get('university') || '');
    setBranch(params.get('branch') || '');
    setYear(params.get('year') || '');
    setSemester(params.get('semester') || '');
    setSubject(decodeURIComponent(params.get('subject') || ''));
  }, [location]);

  useEffect(() => {
    const fetchUnits = async () => {
      if (!regulation || !university || !branch || !year || !semester || !subject) return;

      try {
        const response = await fetch(API_ENDPOINTS.syllabus);
        const data = await response.json();

        const subjectList = data?.[regulation]?.[university]?.[branch]?.[year]?.[semester]?.subjects || [];
        const currentSubject = subjectList.find((subj) => subj.name === subject);

        setUnitNames(currentSubject?.unitNames || []);
      } catch (error) {
        console.error('Error loading unit names:', error);
        setUnitNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [regulation, university, branch, year, semester, subject]);

  const handleSyllabusClick = () => {
    alert('Syllabus overview feature coming soon!');
  };

  const handleShowAllSubjects = () => {
    setShowSubjectPopup(true);
  };

  const handleClosePopup = () => {
    setShowSubjectPopup(false);
  };

  const handleSubjectSelect = (selectedSubject) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set('subject', encodeURIComponent(selectedSubject.name || selectedSubject));
    navigate(`${location.pathname}?${currentParams.toString()}`);
    setShowSubjectPopup(false);
  };

  return (
    <div className="unitpage-root">
      <div className="unitpage-bg">
        <div className="bg-dot dot1"></div>
        <div className="bg-dot dot2"></div>
      </div>

      <div className="unitpage-header">
        <button className="unitpage-back" onClick={() => navigate(-1)}>←</button>
        <div className="navbar-logo-header">
          <BookOpen className="w-6 h-6 text-cyan-400" onClick={() => navigate('/')} />
        </div>
      </div>

      <div className="unitpage-main">
        <div className="unitpage-titlebox">
          <h1>{subject} - Units</h1>
          <p>
            <span className="unitpage-highlight">{regulation}</span> •
            <span className="unitpage-highlight">{university}</span> •
            <span className="unitpage-highlight">{branch}</span> •
            <span className="unitpage-highlight">{year} Year</span> •
            <span className="unitpage-highlight">Semester {semester}</span>
          </p>

          <div className="syllabus-overview-section">
            <button 
              className="syllabus-overview-btn" 
              onClick={handleSyllabusClick}
            >
              <FileText className="w-5 h-5" />
              View Subject Syllabus Overview
            </button>
            
            <button 
              className="show-subjects-btn" 
              onClick={handleShowAllSubjects}
            >
              <List className="w-5 h-5" />
              View All Subjects
            </button>
          </div>
        </div>

        <div className="unitpage-grid">
          {loading ? (
            <div className="loading-message">Loading units...</div>
          ) : unitNames.length > 0 ? (
            unitNames.map((unitTitle, index) => (
              <Card key={index} className="unit-card">
                <div className="unit-card-content">
                  <div className="unit-index">{index + 1}</div>
                  <div>
                    <div className="unit-label">Unit {index + 1}</div>
                    <div className="unit-topics">{unitTitle}</div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="no-units" style={{ textAlign: 'center', color: '#d1d5db' }}>
              No units available for this subject
            </div>
          )}
        </div>
      </div>

      <ViewAllSubjects
        isOpen={showSubjectPopup}
        onClose={handleClosePopup}
        onSubjectSelect={handleSubjectSelect}
        regulation={regulation}
        university={university}
        branch={branch}
        year={year}
        semester={semester}
      />
    </div>
  );
};

export default Units;