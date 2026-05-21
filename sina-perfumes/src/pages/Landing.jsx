// src/pages/Landing.jsx
import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';
import './Landing.css';

/* ── Floating particle data ── */
const PARTICLES = Array.from({length: 18}, (_, i) => ({
  id: i,
  size:  Math.random() * 6 + 2,
  x:     Math.random() * 100,
  y:     Math.random() * 100,
  delay: Math.random() * 6,
  dur:   Math.random() * 4 + 6,
}));

const Landing = () => {
  const navigate = useNavigate();
  const heroRef  = useRef(null);

  /* Subtle parallax on mouse move */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMove = (e) => {
      const {clientX, clientY} = e;
      const {innerWidth, innerHeight} = window;
      const xPct = (clientX / innerWidth  - 0.5) * 18;
      const yPct = (clientY / innerHeight - 0.5) * 10;
      hero.style.setProperty('--mx', `${xPct}px`);
      hero.style.setProperty('--my', `${yPct}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="landing page-enter">
      {/* ── Hero ── */}
      <section className="landing__hero" ref={heroRef}>
        {/* Background orbs */}
        <div className="landing__orb landing__orb--1" />
        <div className="landing__orb landing__orb--2" />
        <div className="landing__orb landing__orb--3" />

        {/* Floating particles */}
        <div className="landing__particles" aria-hidden="true">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="landing__particle"
              style={{
                width:           `${p.size}px`,
                height:          `${p.size}px`,
                left:            `${p.x}%`,
                top:             `${p.y}%`,
                animationDelay:  `${p.delay}s`,
                animationDuration:`${p.dur}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="landing__hero-content">
          <p className="landing__overline label-text">Paris · Parfumerie d'Exception</p>

          <h1 className="landing__headline display-title">
            <span className="landing__headline-line">Your soul,</span>
            <span className="landing__headline-line landing__headline-line--gold">
              distilled.
            </span>
          </h1>

          <p className="landing__subheadline">
            A luxury AI atelier that crafts your singular fragrance —<br />
            born from personality, memory, and desire.
          </p>

          <div className="landing__cta-group">
            <Button onClick={() => navigate('/quiz')} variant="primary">
              Create My Perfume
            </Button>
            <Button onClick={() => navigate('/gallery')} variant="ghost">
              View Gallery
            </Button>
          </div>

          <div className="landing__scroll-hint" aria-hidden="true">
            <div className="landing__scroll-line" />
            <span className="label-text">Discover below</span>
          </div>
        </div>

        {/* Decorative bottle silhouette */}
        <div className="landing__bottle" aria-hidden="true">
          <svg viewBox="0 0 200 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M85 40 L85 10 L115 10 L115 40 Q130 50 140 70 L150 100 L150 290 Q150 310 130 320 L70 320 Q50 310 50 290 L50 100 L60 70 Q70 50 85 40 Z"
              fill="url(#bottleGrad)"
              opacity="0.18"
            />
            <path
              d="M85 40 L85 10 L115 10 L115 40 Q130 50 140 70 L150 100 L150 290 Q150 310 130 320 L70 320 Q50 310 50 290 L50 100 L60 70 Q70 50 85 40 Z"
              stroke="url(#goldGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Liquid level */}
            <path
              d="M52 160 L148 160 L148 290 Q148 308 130 318 L70 318 Q52 308 52 290 Z"
              fill="url(#liquidGrad)"
              opacity="0.25"
            />
            {/* Cap */}
            <rect x="80" y="5" width="40" height="10" rx="3" fill="url(#goldGrad)" opacity="0.6" />
            {/* Label */}
            <rect x="62" y="180" width="76" height="90" rx="4" fill="white" opacity="0.15" />
            <line x1="70" y1="200" x2="130" y2="200" stroke="rgba(184,146,58,0.4)" strokeWidth="0.8" />
            <line x1="70" y1="210" x2="130" y2="210" stroke="rgba(184,146,58,0.3)" strokeWidth="0.8" />
            <line x1="70" y1="220" x2="110" y2="220" stroke="rgba(184,146,58,0.3)" strokeWidth="0.8" />

            <defs>
              <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#D4AF6A" />
                <stop offset="100%" stopColor="#E8C8BB" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#D4AF6A" />
                <stop offset="100%" stopColor="#B8923A" />
              </linearGradient>
              <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#E8C8BB" />
                <stop offset="100%" stopColor="#C9937A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="landing__about">
        <div className="landing__about-inner">
          <div className="gold-divider">
            <span className="label-text">The Experience</span>
          </div>

          <h2 className="landing__about-title display-title">
            Where identity becomes<br />
            <em>a fragrance.</em>
          </h2>

          <p className="landing__about-text">
            Sina Perfumes AI Studio is a luxury digital atelier inspired by the grand
            perfume houses of Paris. Using the intelligence of AI and the language of
            scent, we translate your personality, mood, and desires into a bespoke
            fragrance concept — yours alone.
          </p>

          <div className="landing__pillars">
            {[
              {
                num: '01',
                title: 'The Consultation',
                body: 'A seven-question personality journey that reveals your olfactive identity.',
              },
              {
                num: '02',
                title: 'The Creation',
                body: 'Our AI parfumeur composes your unique scent pyramid — top, heart, and base.',
              },
              {
                num: '03',
                title: 'The Portrait',
                body: 'Receive a poetic perfume profile: your name, your notes, your mood.',
              },
            ].map(({num, title, body}) => (
              <div key={num} className="landing__pillar">
                <span className="landing__pillar-num label-text">{num}</span>
                <h3 className="landing__pillar-title serif-title">{title}</h3>
                <p className="landing__pillar-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial / Quote ── */}
      <section className="landing__quote">
        <div className="landing__quote-inner">
          <blockquote className="landing__blockquote display-title">
            "A perfume is more than a scent — it is an autobiography written in
            molecules."
          </blockquote>
          <cite className="landing__cite label-text">— The House of Sina</cite>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="landing__final-cta">
        <div className="landing__final-cta-inner">
          <h2 className="landing__final-title display-title">
            Your signature awaits.
          </h2>
          <p className="landing__final-sub">
            Seven questions. One unforgettable fragrance.
          </p>
          <Button onClick={() => navigate('/quiz')} variant="primary">
            Begin the Journey
          </Button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <p className="label-text">
          SINA PERFUMES AI STUDIO &nbsp;·&nbsp; A Portfolio Project &nbsp;·&nbsp; Toronto
        </p>
        <p style={{fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem'}}>
          Crafted with React & Firebase &nbsp;·&nbsp; AI by Claude
        </p>
      </footer>
    </div>
  );
};

export default Landing;
