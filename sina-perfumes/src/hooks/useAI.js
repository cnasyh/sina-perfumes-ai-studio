// src/hooks/useAI.js
// ─────────────────────────────────────────────────────────────
// Custom hook that calls the Anthropic API to generate a perfume
// profile, then saves it to Firestore.
// ─────────────────────────────────────────────────────────────

import {useState, useCallback} from 'react';
import {buildPerfumePrompt, parsePerfumeResponse} from '../utils/aiPrompt';
import {savePerfumeProfile} from '../firebase/firestoreService';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const generatePerfume = useCallback(async (answers, userName) => {
    setLoading(true);
    setError(null);

    try {
      const prompt = buildPerfumePrompt(answers, userName);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{role: 'user', content: prompt}],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('');

      const profile = parsePerfumeResponse(rawText);
      if (!profile) throw new Error('Failed to parse perfume profile.');

      const fullProfile = {
        userName,
        answers: Object.values(answers),
        ...profile,
      };

      const docId = await savePerfumeProfile(fullProfile);
      return {id: docId, ...fullProfile};
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {generatePerfume, loading, error};
};
