// src/utils/quizData.js
// ─────────────────────────────────────────────────────────────
// Personality-based questions for the perfume creation quiz.
// Each question has an id, text, and array of option objects.
// ─────────────────────────────────────────────────────────────

export const quizQuestions = [
  {
    id: 'q1',
    category: 'Personality',
    question: 'Which word resonates most deeply with you?',
    options: [
      {value: 'mysterious', label: 'Mysterious', emoji: '🌑'},
      {value: 'radiant',    label: 'Radiant',    emoji: '☀️'},
      {value: 'serene',     label: 'Serene',     emoji: '🌊'},
      {value: 'passionate', label: 'Passionate', emoji: '🔥'},
    ],
  },
  {
    id: 'q2',
    category: 'Mood',
    question: 'How do you feel in this moment?',
    options: [
      {value: 'peaceful',   label: 'Peaceful & calm',    emoji: '🕊️'},
      {value: 'energized',  label: 'Energized & bold',   emoji: '⚡'},
      {value: 'romantic',   label: 'Romantic & tender',  emoji: '🌹'},
      {value: 'melancholic',label: 'Reflective & deep',  emoji: '🌧️'},
    ],
  },
  {
    id: 'q3',
    category: 'Environment',
    question: 'Your ideal place to exist in right now?',
    options: [
      {value: 'forest',     label: 'Ancient forest at dawn',   emoji: '🌲'},
      {value: 'ocean',      label: 'Mediterranean coastline',  emoji: '🌊'},
      {value: 'city',       label: 'Paris in the evening rain',emoji: '🗼'},
      {value: 'desert',     label: 'Golden Sahara at sunset',  emoji: '🌅'},
    ],
  },
  {
    id: 'q4',
    category: 'Style',
    question: 'Your personal style is best described as…',
    options: [
      {value: 'classic',    label: 'Timeless & elegant',  emoji: '🎩'},
      {value: 'bohemian',   label: 'Free-spirited & raw', emoji: '🌿'},
      {value: 'modern',     label: 'Sharp & minimalist',  emoji: '◾'},
      {value: 'romantic',   label: 'Soft & sensual',      emoji: '🌸'},
    ],
  },
  {
    id: 'q5',
    category: 'Impression',
    question: 'What impression do you want to leave behind?',
    options: [
      {value: 'unforgettable', label: 'Unforgettable & intense',   emoji: '💫'},
      {value: 'approachable',  label: 'Warm & approachable',       emoji: '🤗'},
      {value: 'intriguing',    label: 'Intriguing & complex',      emoji: '🔮'},
      {value: 'fresh',         label: 'Fresh & effortless',        emoji: '🍃'},
    ],
  },
  {
    id: 'q6',
    category: 'Time of Day',
    question: 'When does your soul feel most alive?',
    options: [
      {value: 'dawn',      label: 'At dawn — new beginnings',  emoji: '🌄'},
      {value: 'afternoon', label: 'Afternoon — full presence', emoji: '🌤️'},
      {value: 'dusk',      label: 'Dusk — golden transitions', emoji: '🌇'},
      {value: 'midnight',  label: 'Midnight — infinite depth', emoji: '🌙'},
    ],
  },
  {
    id: 'q7',
    category: 'Texture',
    question: 'If your scent were a texture, it would be…',
    options: [
      {value: 'velvet',   label: 'Velvet — rich & enveloping', emoji: '🫧'},
      {value: 'silk',     label: 'Silk — smooth & luminous',   emoji: '✨'},
      {value: 'linen',    label: 'Linen — clean & airy',       emoji: '🌬️'},
      {value: 'leather',  label: 'Leather — bold & enduring',  emoji: '🤎'},
    ],
  },
];
