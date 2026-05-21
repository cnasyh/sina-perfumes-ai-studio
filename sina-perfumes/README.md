# SINA · PERFUMES AI Studio

A luxury AI perfume studio — portfolio project by Sina Sayahi.

## Tech Stack

- **React** (CRA) — frontend
- **React Router v6** — client-side routing
- **Firebase / Firestore** — saving perfume profiles
- **Claude AI (Anthropic)** — perfume generation via claude-sonnet-4-20250514

---

## Project Structure

```
sina-perfumes/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.jsx / .css
│   │   ├── LoadingOverlay.jsx / .css
│   │   ├── Navbar.jsx / .css
│   │   ├── NoteTag.jsx / .css
│   │   └── PerfumeCard.jsx / .css
│   ├── firebase/
│   │   ├── config.js          ← add your Firebase credentials here
│   │   └── firestoreService.js
│   ├── hooks/
│   │   └── useAI.js
│   ├── pages/
│   │   ├── Gallery.jsx / .css
│   │   ├── Landing.jsx / .css
│   │   ├── Quiz.jsx / .css
│   │   └── Result.jsx / .css
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── aiPrompt.js
│   │   └── quizData.js
│   ├── App.jsx
│   └── index.js
└── package.json
```

---

## Setup

### 1. Install dependencies

```bash
cd ~/coffeefuel/sina-perfumes
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Firestore Database** (start in test mode)
4. Register a web app and copy the config object
5. Paste your credentials into `src/firebase/config.js`

### 3. Configure the Anthropic API

The app calls the Anthropic API directly from the browser (no backend server needed for this portfolio project). The API key is handled by the Anthropic SDK — this project uses the claude.ai artifact pattern where the key is injected at request time.

> **Note:** For a real production app, you would proxy API calls through a backend server to protect your API key.

### 4. Run the app

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Firestore Data Model

Collection: `perfumeProfiles`

```json
{
  "userName":           "string",
  "answers":            ["array", "of", "answer", "values"],
  "perfumeName":        "string",
  "personalitySummary": "string",
  "notes": {
    "top":   ["string", "string", "string"],
    "heart": ["string", "string", "string"],
    "base":  ["string", "string", "string"]
  },
  "mood":              "string",
  "description":       "string",
  "matchPercentage":   99,
  "createdAt":         "Firestore Timestamp"
}
```

---

## Pages

| Route      | Page     | Description                                      |
|------------|----------|--------------------------------------------------|
| `/`        | Landing  | Hero + about + CTA sections                      |
| `/quiz`    | Quiz     | 7-question personality consultation              |
| `/result`  | Result   | AI-generated perfume profile with fragrance wheel|
| `/gallery` | Gallery  | All saved perfume profiles with flip cards       |

---

## Design System

| Token              | Value                        |
|--------------------|------------------------------|
| `--cream`          | `#F7F3EE` (background)       |
| `--gold`           | `#B8923A` (primary accent)   |
| `--charcoal`       | `#1C1814` (dark text/bg)     |
| `--blush`          | `#E8C8BB` (soft pink)        |
| `--font-display`   | Cormorant Garamond           |
| `--font-serif`     | Playfair Display             |
| `--font-sans`      | Jost                         |

---

*Built with React, Firebase & Claude AI · Toronto, 2024*
