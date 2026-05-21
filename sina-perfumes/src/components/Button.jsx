// src/components/Button.jsx
import React from 'react';
import './Button.css';

/**
 * Luxury Button component.
 * variant: 'primary' | 'secondary' | 'ghost'
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant}${fullWidth ? ' btn--full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn__inner">{children}</span>
    </button>
  );
};

export default Button;
