// src/components/PerfumeCard.jsx
import React, {useState} from 'react';
import NoteTag from './NoteTag';
import './PerfumeCard.css';

const PerfumeCard = ({profile}) => {
  const [flipped, setFlipped] = useState(false);

  const formattedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div
      className={`perfume-card${flipped ? ' perfume-card--flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((v) => !v)}
      aria-label={`Perfume card for ${profile.perfumeName}. Click to flip.`}
    >
      <div className="perfume-card__inner">
        {/* ── Front ── */}
        <div className="perfume-card__front">
          <div className="perfume-card__orb" />
          <p className="perfume-card__label label-text">Curated for</p>
          <p className="perfume-card__user">{profile.userName}</p>
          <h3 className="perfume-card__name display-title">{profile.perfumeName}</h3>
          <p className="perfume-card__mood">{profile.mood}</p>
          <div className="perfume-card__match">
            <span className="perfume-card__match-num">{profile.matchPercentage}%</span>
            <span className="perfume-card__match-label label-text">match</span>
          </div>
          {formattedDate && (
            <p className="perfume-card__date label-text">{formattedDate}</p>
          )}
          <p className="perfume-card__flip-hint label-text">tap to reveal notes</p>
        </div>

        {/* ── Back ── */}
        <div className="perfume-card__back">
          <p className="perfume-card__label label-text">Fragrance Notes</p>
          <h4 className="perfume-card__name display-title" style={{fontSize: '1.3rem'}}>
            {profile.perfumeName}
          </h4>

          <div className="perfume-card__notes-section">
            <p className="perfume-card__notes-label label-text">Top</p>
            <div className="perfume-card__tags">
              {profile.notes?.top?.map((note) => (
                <NoteTag key={note} variant="top">{note}</NoteTag>
              ))}
            </div>
          </div>

          <div className="perfume-card__notes-section">
            <p className="perfume-card__notes-label label-text">Heart</p>
            <div className="perfume-card__tags">
              {profile.notes?.heart?.map((note) => (
                <NoteTag key={note} variant="heart">{note}</NoteTag>
              ))}
            </div>
          </div>

          <div className="perfume-card__notes-section">
            <p className="perfume-card__notes-label label-text">Base</p>
            <div className="perfume-card__tags">
              {profile.notes?.base?.map((note) => (
                <NoteTag key={note} variant="base">{note}</NoteTag>
              ))}
            </div>
          </div>

          <p className="perfume-card__flip-hint label-text">tap to go back</p>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCard;
