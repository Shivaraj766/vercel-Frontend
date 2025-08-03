import React, { useState } from 'react';
import {BookOpen} from 'lucide-react'
import './index.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="navbar-title">Digital Library</span>
        </div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">Resources</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <a href="#">Home</a>
          <a href="#">Resources</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;