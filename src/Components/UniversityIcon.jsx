import React from 'react';

const UniversityIcon = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main University Building */}
      <rect x="15" y="35" width="70" height="50" rx="2" fill="currentColor" opacity="0.9"/>
      
      {/* Central Tower */}
      <rect x="40" y="20" width="20" height="65" rx="1" fill="currentColor"/>
      
      {/* Tower Top */}
      <polygon points="38,20 50,8 62,20" fill="currentColor"/>
      
      {/* Clock */}
      <circle cx="50" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
      <path d="M50 27v3l2 2" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
      
      {/* Main Entrance */}
      <rect x="45" y="55" width="10" height="30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M45 60h10" stroke="currentColor" strokeWidth="1"/>
      
      {/* Left Windows */}
      <rect x="20" y="45" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="20" y="58" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="30" y="45" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="30" y="58" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      
      {/* Right Windows */}
      <rect x="64" y="45" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="64" y="58" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="74" y="45" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="74" y="58" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      
      {/* Columns */}
      <rect x="25" y="70" width="2" height="15" fill="currentColor" opacity="0.7"/>
      <rect x="35" y="70" width="2" height="15" fill="currentColor" opacity="0.7"/>
      <rect x="63" y="70" width="2" height="15" fill="currentColor" opacity="0.7"/>
      <rect x="73" y="70" width="2" height="15" fill="currentColor" opacity="0.7"/>
      
      {/* Base */}
      <rect x="10" y="85" width="80" height="5" rx="1" fill="currentColor" opacity="0.8"/>
      
      {/* Flag */}
      <rect x="52" y="15" width="8" height="5" fill="currentColor" opacity="0.6"/>
      <path d="M52 15L52 8" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
};

export default UniversityIcon;
