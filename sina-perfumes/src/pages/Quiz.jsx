// src/pages/Quiz.jsx
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {quizQuestions} from '../utils/quizData';
import {useAI} from '../hooks/useAI';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import './Quiz.css';

const STEP_NAME = 'name';

const Quiz = () => {
  const navigate = useNavigate();
  const {generatePerfume, loading, error} = useAI();

  const [step, setStep]       = useState(STEP_NAME); // 'name' | 0..6
  const [userName, setUserName] = useState('');
  const [answers, setAnswers]   = useState({});
  const [nameError, setNameError] = useState('');

  const currentQ    = typeof step === 'number' ? quizQuestions[step] : null;
  const totalSteps  = quizQuestions.length;
  const progress    = typeof step === 'number' ? ((step) / totalSteps) * 100 : 0;

  /* ── Handlers ── */
  const handleNameSubmit = () => {
    if (!userName.trim()) {
      setNameError('Please enter your name to continue.');
      return;
    }
    setNameError('');
    setStep(0);
  };

  const handleAnswer = async (value) => {
    const newAnswers = {...answers, [currentQ.id]: value};
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // All questions answered — generate perfume
      const profile = await generatePerfume(newAnswers, userName.trim());
      if (profile) {
        navigate('/result', {state: {profile}});
      }
    }
  };

  const handleBack = () => {
    if (step === 0) setStep(STEP_NAME);
    else if (typeof step === 'number') setStep(step - 1);
  };

  /* ── Name Screen ── */
  if (step === STEP_NAME) {
    return (
      <div className="quiz page-enter">
        {loading && <LoadingOverlay />}
        <div className="quiz__name-screen">
          <div className="quiz__name-inner">
            <p className="label-text quiz__overline">Before we begin</p>
            <h1 className="display-title quiz__name-title">
              How shall we address<br />
              <em>your fragrance?</em>
            </h1>
            <p className="quiz__name-sub">
              Your name will be woven into your perfume portrait.
            </p>
            <div className="quiz__name-field">
              <input
                type="text"
                className="quiz__input"
                placeholder="Enter your name…"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                autoFocus
                maxLength={40}
              />
              {nameError && <p className="quiz__error">{nameError}</p>}
            </div>
            <Button onClick={handleNameSubmit} variant="primary">
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Question Screen ── */
  return (
    <div className="quiz page-enter">
      {loading && <LoadingOverlay />}

      {/* Progress */}
      <div className="quiz__progress">
        <div className="quiz__progress-bar" style={{width: `${progress}%`}} />
      </div>

      <div className="quiz__container">
        {/* Header */}
        <div className="quiz__header">
          <button className="quiz__back-btn" onClick={handleBack} aria-label="Go back">
            ← Back
          </button>
          <span className="label-text quiz__step-count">
            {step + 1} / {totalSteps}
          </span>
        </div>

        {/* Question */}
        <div className="quiz__question-area">
          <p className="label-text quiz__category">{currentQ.category}</p>
          <h2 className="display-title quiz__question">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="quiz__options">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              className={`quiz__option${answers[currentQ.id] === option.value ? ' quiz__option--selected' : ''}`}
              onClick={() => handleAnswer(option.value)}
            >
              <span className="quiz__option-emoji" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="quiz__option-label">{option.label}</span>
              <span className="quiz__option-arrow">→</span>
            </button>
          ))}
        </div>

        {error && (
          <p className="quiz__error" style={{textAlign: 'center', marginTop: '1rem'}}>
            {error} — Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
