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


# 🤝 Contribution Guide for SoulScript 🧘‍♀️
Thank you for your interest in contributing to **SoulScript** — a mental journaling app powered by AI!  
We appreciate your effort to improve the app and welcome all kinds of contributions: bug fixes, new features, documentation improvements, or performance tweaks.

Please follow this guide to contribute effectively and safely.

✅ Contribution Rules
Do not push directly to main

Always use branches for your changes

Submit one feature or fix per PR

Be responsive to review feedback

Keep changes focused and well-tested

---

## 📋 Prerequisites

Before contributing, ensure you have the following installed:

- ✅ Git
- ✅ Node.js and npm
- ✅ A GitHub account

---

## 🧭 Step-by-Step Contribution Workflow

### 1️⃣ Fork the Repository

Go to the [SoulScript Repo](https://github.com/varshith19-ctrl/SoulScript) and click the **“Fork”** button in the top-right corner.  
This will create a copy of the repository under your GitHub account.

---

### 2️⃣ Clone Your Fork

Clone your forked repo to your local machine:

```bash
git clone https://github.com/your-username/SoulScript.git
cd SoulScript

### 3️⃣ Create a New Branch

git checkout -b feature/your-branch-name


### 4️⃣ Install Project Dependencies

cd frontend
npm install

cd ../backend
npm install


### 5️⃣ Set Up Environment Variables

 already mentioned at the beginning check it out.

### 6️⃣ Make Your Changes

Follow the existing folder structure and code style

Add comments where needed

If applicable, update documentation or README

### 7️⃣ Commit Your Changes

git add .
git commit -m "ex:- Add: new animated mood ring on dashboard"

### 8️⃣ Push to Your Fork

git push origin feature/your-branch-name

### 9️⃣ Open a Pull Request

Go to your forked repo on GitHub

Click "Compare & Pull Request"

Set:

Base repository: varshith19-ctrl/SoulScript

Base branch: main

Head branch: your feature branch

Add a descriptive title and explanation

Click "Create Pull Request"

🎉 You're done! Now wait for review.

🙌 Thank You!

Every contribution counts. Whether you write code, improve docs, or open an issue — you’re helping make SoulScript better for everyone.

Made with 💚 mindfulness and 🧠 AI by Varshith


 

