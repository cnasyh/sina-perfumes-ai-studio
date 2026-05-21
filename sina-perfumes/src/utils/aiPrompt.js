// src/utils/aiPrompt.js
// ─────────────────────────────────────────────────────────────
// Builds the Claude AI prompt from quiz answers and parses the
// structured JSON response into a perfume profile object.
// ─────────────────────────────────────────────────────────────

import {quizQuestions} from './quizData';

/**
 * Build a structured prompt for the AI from user answers.
 * @param {object} answers — { q1: 'mysterious', q2: 'peaceful', ... }
 * @param {string} userName
 * @returns {string} the full prompt string
 */
export const buildPerfumePrompt = (answers, userName) => {
  const answerLines = quizQuestions.map((q) => {
    const selected = q.options.find((o) => o.value === answers[q.id]);
    return `- ${q.category}: ${selected?.label ?? answers[q.id]}`;
  }).join('\n');

  return `You are a master French perfumer and creative poet at a legendary luxury Parisian perfume house.

A client named ${userName} has completed a personality consultation. Based on their responses, create a unique, poetic luxury perfume profile. Respond ONLY with a valid JSON object — no markdown, no explanation.

Client profile:
${answerLines}

Return exactly this JSON shape:
{
  "perfumeName": "A unique, evocative luxury perfume name in English or French (2-4 words)",
  "personalitySummary": "2-3 sentences poetically describing this person's essence",
  "notes": {
    "top": ["note1", "note2", "note3"],
    "heart": ["note1", "note2", "note3"],
    "base": ["note1", "note2", "note3"]
  },
  "mood": "One evocative mood phrase (3-6 words)",
  "description": "A 3-4 sentence poetic description of the perfume — its story, sensation, and what wearing it feels like",
  "matchPercentage": <integer between 88 and 99>
}`;
};

/**
 * Parse the raw AI text response into a perfume profile object.
 * @param {string} rawText
 * @returns {object|null}
 */
export const parsePerfumeResponse = (rawText) => {
  try {
    const clean = rawText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
};
