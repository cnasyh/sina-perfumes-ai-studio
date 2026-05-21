// src/components/Navbar.jsx
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    {path: '/',        label: 'Atelier'},
    {path: '/quiz',    label: 'Create'},
    {path: '/gallery', label: 'Gallery'},
  ];

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-sina">SINA</span>
          <span className="navbar__brand-sep">·</span>
          <span className="navbar__brand-sub">PERFUMES</span>
        </Link>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          {links.map(({path, label}) => (
            <li key={path}>
              <Link
                to={path}
                className={`navbar__link${location.pathname === path ? ' navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/quiz" className="navbar__cta">
              Begin Journey
            </Link>
          </li>
        </ul>

        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
