// src/firebase/firestoreService.js
// ─────────────────────────────────────────────────────────────
// All Firestore read/write helpers for perfume profiles.
// ─────────────────────────────────────────────────────────────

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import {db} from './config';

const COLLECTION = 'perfumeProfiles';

/**
 * Save a generated perfume profile to Firestore.
 * @param {object} profile — matches the data model in README
 * @returns {string} the new document id
 */
export const savePerfumeProfile = async (profile) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...profile,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Fetch the most recent perfume profiles from Firestore.
 * @param {number} maxCount — defaults to 20
 * @returns {Array<object>} array of profile objects (id included)
 */
export const fetchPerfumeProfiles = async (maxCount = 20) => {
  const q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(maxCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() ?? null,
  }));
};
