// src/pages/Gallery.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchPerfumeProfiles} from '../firebase/firestoreService';
import PerfumeCard from '../components/PerfumeCard';
import Button from '../components/Button';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPerfumeProfiles(20);
        setProfiles(data);
      } catch (err) {
        setError('Unable to load the gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="gallery page-enter">
      {/* ── Header ── */}
      <section className="gallery__header">
        <div className="gallery__header-inner">
          <p className="label-text gallery__overline">The Archive</p>
          <h1 className="display-title gallery__title">
            Fragrance<br />
            <em>Gallery</em>
          </h1>
          <p className="gallery__subtitle">
            Every soul that passed through the atelier — immortalized in scent.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="gallery__body">
        {loading && (
          <div className="gallery__loading">
            <div className="gallery__loading-orb" />
            <p className="display-title gallery__loading-text">
              Gathering fragrances…
            </p>
          </div>
        )}

        {error && (
          <div className="gallery__empty">
            <p className="gallery__empty-text">{error}</p>
            <Button onClick={() => window.location.reload()} variant="secondary">
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && profiles.length === 0 && (
          <div className="gallery__empty">
            <p className="display-title gallery__empty-headline">
              The gallery awaits its first creation.
            </p>
            <p className="gallery__empty-text">
              Be the first to leave your fragrant mark.
            </p>
            <Button onClick={() => navigate('/quiz')} variant="primary">
              Create My Perfume
            </Button>
          </div>
        )}

        {!loading && !error && profiles.length > 0 && (
          <>
            <div className="gallery__stats label-text">
              {profiles.length} fragrance{profiles.length !== 1 ? 's' : ''} in the archive
            </div>
            <div className="gallery__grid">
              {profiles.map((profile) => (
                <PerfumeCard key={profile.id} profile={profile} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── CTA ── */}
      {!loading && (
        <section className="gallery__cta">
          <Button onClick={() => navigate('/quiz')} variant="primary">
            Create My Perfume
          </Button>
        </section>
      )}
    </div>
  );
};

export default Gallery;
