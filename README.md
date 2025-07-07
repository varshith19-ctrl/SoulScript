# 🧘‍♀️ SoulScript - Mental Journaling App with AI Mood Analysis

**SoulScript** is a calming and intelligent mental journaling web application that allows users to log daily thoughts, reflect on their emotional states, and receive insightful mood-based suggestions. It combines the simplicity of a journaling app with the power of **AI mood analysis**, enabling deeper self-awareness and emotional growth.

The app features a beautiful, soothing UI, community posts, chart-based mood tracking, and smart suggestions — all designed to support your mental well-being.

---

## 🌟 Features

- 📝 **Daily Journal Entries**: Users can write their thoughts, feelings, and reflections.
- 📈 **Mood Score Visualization**: Track your emotional trends using dynamic charts.
- 🧠 **AI Mood Analysis**: Each entry is analyzed using a Transformer-based AI model to score your mood and generate wellness suggestions.
- 💌 **Smart Suggestions**: Get uplifting or reflective guidance tailored to your current mood.
- 🧘‍♂️ **Soothing UI**: Built using Tailwind CSS and DaisyUI with a calming, minimalist theme.
- 🌍 **Community Posts**: Share anonymized reflections and see how others are feeling.
- 🔐 **Authentication**: Secure login and registration with mood data stored per user.

---

## 🛠️ Tech Stack

| Layer         | Tech Used                                     |
|---------------|-----------------------------------------------|
| Frontend      | React, Tailwind CSS v4.1, DaisyUI             |
| Backend       | Node.js, Express.js                           |
| Database      | MongoDB with Mongoose                         |
| AI Model      | Xenova Transformers (client-side mood scoring)|
| Charts        | Chart.js / Recharts                           |
| Deployment    | Vercel (frontend), Render (backend)           |

---

## 🌐 Live Link

**Note**: Please wait a few seconds for the server to wake up on first load.

👉 [https://mental-health-journal-pi.vercel.app/](https://mental-health-journal-pi.vercel.app/)

---

## 📦 Installation Guide

### 1. Clone the Repository

```VSCode
git clone https://github.com/varshith19-ctrl/SoulScript.git
cd SoulScript
code .

### 2. Install Dependencies
cd frontend
npm install

cd backend
npm install

### 3. Setup Environment Variables
backend:
PORT=...
MONGO_URI=your mongouri
JWT_SECRET=....
NODE_ENV=...

frontend :
VITE_API_BASE_URL=...

### 4. Run the Application
cd backend
npm run dev

cd frontend
npm run dev


 

