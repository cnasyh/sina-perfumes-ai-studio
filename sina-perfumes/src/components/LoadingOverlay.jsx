// src/components/LoadingOverlay.jsx
import React from 'react';
import './LoadingOverlay.css';

const MESSAGES = [
  'Reading your soul…',
  'Consulting the maître parfumeur…',
  'Distilling your essence…',
  'Composing your signature…',
];

const LoadingOverlay = ({message}) => (
  <div className="loading-overlay">
    <div className="loading-overlay__inner">
      <div className="loading-overlay__flask">
        <div className="loading-overlay__bubble" />
        <div className="loading-overlay__bubble loading-overlay__bubble--2" />
        <div className="loading-overlay__bubble loading-overlay__bubble--3" />
      </div>
      <p className="loading-overlay__message display-title">
        {message || MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}
      </p>
      <div className="loading-overlay__dots">
        <span /><span /><span />
      </div>
    </div>
  </div>
);

export default LoadingOverlay;
