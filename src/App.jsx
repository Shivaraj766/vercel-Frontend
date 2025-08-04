import HomePage from './Pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import BranchPage from './Pages/BranchPage';
import YearPage from './Pages/YearPage';
import SemestersPage from './Pages/SemesterPage';
import SubjectPage from './Pages/SubjectPage';
import UnitPage from './Pages/UnitPage';
import { useEffect } from 'react';
import { apiService } from './config/api';

import NotFound  from './Pages/NotFound';

function App() {
  // 🚀 Preload data when app starts
  useEffect(() => {
    console.log('🚀 App started - preloading syllabus data...');
    apiService.preloadData();
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/branches" element={<BranchPage />} />
      <Route path="/years" element={<YearPage />} />
      <Route path="/semesters" element={<SemestersPage />} />
      <Route path="/subjects" element={<SubjectPage />} />
      <Route path="/units" element={<UnitPage />} />      
     
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;