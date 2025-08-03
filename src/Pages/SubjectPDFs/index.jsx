import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Download, ArrowLeft, ExternalLink } from 'lucide-react';
import './index.css';

const SubjectPDFs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjectName, setSubjectName] = useState('');
  const [driveFolder, setDriveFolder] = useState('');
  const [pdfLinks, setPdfLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample PDF links - these would typically come from your Google Drive API
  const samplePDFLinks = [
    { name: 'Unit 1 - Introduction', url: '#', type: 'PDF' },
    { name: 'Unit 2 - Fundamentals', url: '#', type: 'PDF' },
    { name: 'Unit 3 - Advanced Topics', url: '#', type: 'PDF' },
    { name: 'Unit 4 - Applications', url: '#', type: 'PDF' },
    { name: 'Unit 5 - Case Studies', url: '#', type: 'PDF' },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = decodeURIComponent(params.get('subject') || '');
    const folder = decodeURIComponent(params.get('driveFolder') || '');
    
    setSubjectName(name);
    setDriveFolder(folder);
    
    // Simulate loading PDF links from Google Drive
    setTimeout(() => {
      setPdfLinks(samplePDFLinks);
      setLoading(false);
    }, 1000);
  }, [location]);

  const handlePDFClick = (pdfLink) => {
    if (driveFolder) {
      // Open the Google Drive folder
      window.open(driveFolder, '_blank');
    } else {
      // Fallback to PDF URL if available
      window.open(pdfLink.url, '_blank');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="subject-pdfs-root">
      <div className="subject-pdfs-bg">
        <div className="bg-dot dot1"></div>
        <div className="bg-dot dot2"></div>
        <div className="bg-dot dot3"></div>
      </div>

      <div className="subject-pdfs-header">
        <button className="back-btn" onClick={handleBackClick}>
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="header-logo">
          <BookOpen className="w-6 h-6 text-cyan-400" onClick={() => navigate('/')} />
        </div>
      </div>

      <div className="subject-pdfs-main">
        <div className="subject-pdfs-titlebox">
          <h1>{subjectName}</h1>
          <p>Study Materials & Resources</p>
          
          {driveFolder && (
            <div className="drive-folder-section">
              <button 
                className="drive-folder-btn" 
                onClick={() => window.open(driveFolder, '_blank')}
              >
                <ExternalLink className="w-5 h-5" />
                Open Google Drive Folder
              </button>
            </div>
          )}
        </div>

        <div className="pdfs-grid">
          {loading ? (
            <div className="loading-message">Loading materials...</div>
          ) : pdfLinks.length > 0 ? (
            pdfLinks.map((pdf, index) => (
              <div
                key={index}
                className="pdf-card"
                onClick={() => handlePDFClick(pdf)}
              >
                <div className="pdf-card-content">
                  <div className="pdf-icon">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="pdf-info">
                    <div className="pdf-title">{pdf.name}</div>
                    <div className="pdf-type">{pdf.type}</div>
                  </div>
                  <div className="pdf-download">
                    <Download className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-pdfs">
              <p>No materials available for this subject</p>
              {driveFolder && (
                <button 
                  className="drive-folder-btn" 
                  onClick={() => window.open(driveFolder, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  View Google Drive Folder
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPDFs;
