// src/pages/Result.jsx
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import NoteTag from '../components/NoteTag';
import Button from '../components/Button';
import './Result.css';

/* ── Typewriter hook ── */
const useTypewriter = (text, speed = 28) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!text) return;
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayed;
};

/* ── Fragrance Wheel SVG ── */
const FragranceWheel = ({notes}) => {
  const allNotes = [
    ...(notes?.top   || []).map((n) => ({label: n, type: 'top'})),
    ...(notes?.heart || []).map((n) => ({label: n, type: 'heart'})),
    ...(notes?.base  || []).map((n) => ({label: n, type: 'base'})),
  ];

  const colors = {
    top:   '#D4AF6A',
    heart: '#C9937A',
    base:  '#3D2B1F',
  };

  const radius    = 110;
  const cx        = 160;
  const cy        = 160;
  const labelR    = 145;
  const total     = allNotes.length;

  return (
    <svg className="result__wheel" viewBox="0 0 320 320" aria-label="Fragrance wheel">
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={radius + 20} fill="none" stroke="rgba(184,146,58,0.1)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius}      fill="none" stroke="rgba(184,146,58,0.2)" strokeWidth="1" />

      {/* Center orb */}
      <circle cx={cx} cy={cy} r={38} fill="url(#wheelGrad)" opacity="0.9" />
      <text x={cx} y={cy - 6}  textAnchor="middle" fontSize="8" fill="#F7F3EE" fontFamily="Jost, sans-serif" letterSpacing="1.5">SINA</text>
      <text x={cx} y={cy + 8}  textAnchor="middle" fontSize="6" fill="rgba(247,243,238,0.7)" fontFamily="Jost, sans-serif" letterSpacing="1">PERFUMES</text>

      {/* Note segments */}
      {allNotes.map((note, i) => {
        const angle   = (i / total) * 2 * Math.PI - Math.PI / 2;
        const x       = cx + radius * Math.cos(angle);
        const y       = cy + radius * Math.sin(angle);
        const lx      = cx + labelR * Math.cos(angle);
        const ly      = cy + labelR * Math.sin(angle);

        return (
          <g key={`${note.label}-${i}`}>
            <line
              x1={cx + 42 * Math.cos(angle)}
              y1={cy + 42 * Math.sin(angle)}
              x2={x}
              y2={y}
              stroke={colors[note.type]}
              strokeWidth="1"
              opacity="0.35"
            />
            <circle cx={x} cy={y} r="5" fill={colors[note.type]} opacity="0.8" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fill={colors[note.type]}
              fontFamily="Jost, sans-serif"
              letterSpacing="0.5"
            >
              {note.label}
            </text>
          </g>
        );
      })}

      <defs>
        <radialGradient id="wheelGrad" cx="40%" cy="40%">
          <stop offset="0%"   stopColor="#D4AF6A" />
          <stop offset="60%"  stopColor="#B8923A" />
          <stop offset="100%" stopColor="#3D2B1F" />
        </radialGradient>
      </defs>
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════
   RESULT PAGE
══════════════════════════════════════════════════════════ */
const Result = () => {
  const {state}    = useLocation();
  const navigate   = useNavigate();
  const profile    = state?.profile;
  const description = useTypewriter(profile?.description ?? '', 22);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!profile) {
    return (
      <div className="result result--empty page-enter">
        <p>No perfume profile found.</p>
        <Button onClick={() => navigate('/quiz')} variant="primary">
          Start Again
        </Button>
      </div>
    );
  }

  return (
    <div className={`result page-enter${visible ? ' result--visible' : ''}`}>
      {/* ── Hero Banner ── */}
      <section className="result__hero">
        <div className="result__hero-orb" />
        <div className="result__hero-content">
          <p className="label-text result__curated-for">Curated for</p>
          <p className="result__user-name display-title">{profile.userName}</p>
          <h1 className="result__perfume-name display-title">{profile.perfumeName}</h1>
          <p className="result__mood">{profile.mood}</p>

          <div className="result__match-badge">
            <span className="result__match-num">{profile.matchPercentage}%</span>
            <span className="label-text result__match-label">Personality Match</span>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="result__body">

        {/* Personality Summary */}
        <section className="result__section result__summary-section">
          <div className="gold-divider">
            <span className="label-text">Your Essence</span>
          </div>
          <p className="result__personality">{profile.personalitySummary}</p>
        </section>

        {/* Fragrance Wheel + Notes */}
        <section className="result__section result__notes-section">
          <div className="result__wheel-wrap">
            <FragranceWheel notes={profile.notes} />
          </div>

          <div className="result__notes-detail">
            <div className="gold-divider" style={{marginBottom: '1.5rem'}}>
              <span className="label-text">Fragrance Pyramid</span>
            </div>

            <div className="result__notes-group">
              <div className="result__notes-row">
                <p className="label-text result__notes-label">Top Notes</p>
                <div className="result__tags">
                  {profile.notes.top.map((n) => (
                    <NoteTag key={n} variant="top">{n}</NoteTag>
                  ))}
                </div>
                <p className="result__notes-hint">First impression · 15 minutes</p>
              </div>

              <div className="result__notes-row">
                <p className="label-text result__notes-label">Heart Notes</p>
                <div className="result__tags">
                  {profile.notes.heart.map((n) => (
                    <NoteTag key={n} variant="heart">{n}</NoteTag>
                  ))}
                </div>
                <p className="result__notes-hint">The soul · 2–4 hours</p>
              </div>

              <div className="result__notes-row">
                <p className="label-text result__notes-label">Base Notes</p>
                <div className="result__tags">
                  {profile.notes.base.map((n) => (
                    <NoteTag key={n} variant="base">{n}</NoteTag>
                  ))}
                </div>
                <p className="result__notes-hint">The memory · 6+ hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* Poetic Description */}
        <section className="result__section result__description-section">
          <div className="gold-divider">
            <span className="label-text">The Story</span>
          </div>
          <p className="result__description display-title">
            {description}
            <span className="result__cursor" aria-hidden="true" />
          </p>
        </section>

        {/* Actions */}
        <section className="result__actions">
          <Button onClick={() => navigate('/quiz')} variant="primary">
            Create Another
          </Button>
          <Button onClick={() => navigate('/gallery')} variant="secondary">
            View Gallery
          </Button>
          <Button onClick={() => navigate('/')} variant="ghost">
            Return Home
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Result;
