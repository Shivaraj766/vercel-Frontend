import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card';
import Navbar from '../../Components/Navbar';
import { BookOpen } from 'lucide-react';
import ChittiRobo from '../../ChittiRobo';
import './index.css';

const regulations = ['R20', 'R22', 'R23'];
const universities = [
  { code: 'JNTUA', name: 'JNTU Anantapur', regulations: ['R20', 'R23'] },
  { code: 'JNTUH', name: 'JNTU Hyderabad', regulations: ['R22'] },
  { code: 'JNTUK', name: 'JNTU Kakinada', regulations: ['R23'] },
  { code: 'JNTUGV', name: 'JNTU Gurajada Vizianagaram', regulations: ['R23'] }
];

function HomePage() {
  const [selectedRegulation, setSelectedRegulation] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUniversitySelect = (universityCode) => {
    if (!selectedRegulation) {
      alert('Please select a regulation first');
      return;
    }
    
    const university = universities.find(uni => uni.code === universityCode);
    if (!university.regulations.includes(selectedRegulation)) {
      alert(`${selectedRegulation} is not available for ${universityCode}. Available regulations: ${university.regulations.join(', ')}`);
      return;
    }
    
    navigate(`/branches?regulation=${selectedRegulation}&university=${universityCode}`);
  };

  return (
    <>
      <Navbar />
      <div className="homepage-root">
        {/* Background Elements */}
        <div className="homepage-bg">
          <div className="bg-dot dot1"></div>
          <div className="bg-dot dot2"></div>
          <div className="bg-dot dot3"></div>
          <div className="bg-dot dot4"></div>
          <div className="bg-grid"></div>
        </div>

        {/* Floating Robo Model - Top Right Corner */}
        <div className="chitti-robo-floating">
          <ChittiRobo showFloatingButton={true} />
        </div>

        {/* Main Content */}
        <div className="homepage-main">
          <div className="homepage-grid">
            {/* Left Side */}
            <div className="homepage-info">
              <div className="homepage-header">
                <div className="navbar-logo-2">
                  <BookOpen className="homepage-logo-icon" />
                </div>
                <div className="homepage-title-section">
                  <h1 className="homepage-title">
                    <span className="homepage-title-gradient">Digital Library</span>
                  </h1>
                </div>
              </div>
              <p className="homepage-desc">
                Access comprehensive study materials, syllabi, and resources for all JNTU universities.
                Your gateway to academic excellence.
              </p>
              <ul className="homepage-features">
                <li>Complete syllabus coverage for all branches</li>
                <li>Unit-wise study materials and resources</li>
                <li>Updated content for latest regulations</li>
              </ul>
            </div>
            {/* Right Side */}
            <div className="homepage-select">
              <div className="select-section">
                <h2>Select Regulation</h2>
                <div className="select-row">
                  {regulations.map((reg) => (
                    <Card
                      key={reg}
                      className={`reg-card${selectedRegulation === reg ? ' selected' : ''}`}
                      onClick={() => setSelectedRegulation(reg)}
                    >
                      <div className="reg-label">{reg}</div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="select-section">
                <h2>JNTU Universities</h2>
                <div className="select-grid">
                  {universities.map((uni) => (
                    <Card
                      key={uni.code}
                      className={`uni-card${selectedRegulation && !uni.regulations.includes(selectedRegulation) ? ' disabled' : ''}`}
                      onClick={() => handleUniversitySelect(uni.code)}
                    >
                      <div className="uni-code">{uni.code}</div>
                      <div className="uni-name">{uni.name}</div>
                      <div className="uni-regulations">
                        <span className="regulations-label">Available: </span>
                        {uni.regulations.map((reg, index) => (
                          <span 
                            key={reg} 
                            className={`regulation-tag${selectedRegulation === reg ? ' active' : ''}`}
                          >
                            {reg}{index < uni.regulations.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                      {!selectedRegulation && (
                        <div className="uni-warning-badge">
                          Select regulation first
                        </div>
                      )}
                      {selectedRegulation && !uni.regulations.includes(selectedRegulation) && (
                        <div className="uni-warning-badge unavailable">
                          {selectedRegulation} not available
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;