import React from 'react';
import './index.css';

const Card = ({ children, className = '', variant = 'default', ...props }) => (
  <div className={`custom-card custom-card--${variant} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;