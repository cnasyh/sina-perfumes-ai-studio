// src/components/NoteTag.jsx
import React from 'react';
import './NoteTag.css';

const NoteTag = ({children, variant = 'top'}) => (
  <span className={`note-tag note-tag--${variant}`}>{children}</span>
);

export default NoteTag;
