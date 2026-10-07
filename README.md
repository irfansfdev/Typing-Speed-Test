# ⚡ Typing Speed Test

> A premium, fast, and interactive typing speed test designed to help users improve their typing speed, accuracy, and consistency.

<div align="center">

### 🚀 Live Demo

**[🌐 View Live Project](https://typing-speed-test-muhammad-irfan1.vercel.app/)**

</div>

---

## ✨ Overview

**Typing Speed Test** is a modern web application that allows users to test and improve their typing performance through timed typing challenges.

Users can choose their preferred **difficulty level** and **test duration**, then type through dynamically selected passages while receiving real-time performance statistics.

The application is designed to provide a smooth, focused, and premium typing experience rather than a basic typing calculator.

---

## 🎯 Features

### ⌨️ Typing Test

* Real-time typing experience
* Character-by-character validation
* Correct and incorrect character highlighting
* Live typing cursor
* Automatic scrolling to the current character
* Backspace support
* Paste protection
* Test automatically stops when the timer ends
* Test can also finish when the complete passage is typed

### 🎚️ Difficulty Levels

Choose between three difficulty levels:

| Level     | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 🟢 Easy   | Simple vocabulary and everyday sentences                      |
| 🟡 Medium | More complex sentences and varied vocabulary                  |
| 🔴 Hard   | Advanced vocabulary, technical terms, punctuation and symbols |

### ⏱️ Test Durations

Every difficulty supports:

* 1 Minute
* 2 Minutes
* 3 Minutes
* 4 Minutes
* 5 Minutes

This gives users complete control over their typing practice.

---

## 📊 Live Performance Tracking

During the test, performance is calculated in real time.

The application tracks:

* **WPM** — Words Per Minute
* **Accuracy**
* **Correct Characters**
* **Incorrect Characters**
* **Total Characters**
* **Errors**
* **Remaining Time**
* **Progress**

### WPM Calculation

The application uses the standard typing calculation:

```text
WPM = (Correct Characters / 5) / Elapsed Minutes
```

This provides a consistent measurement of typing speed.

---

## 📝 Large Typing Content Database

The application includes a large collection of typing passages separated by difficulty.

### Easy

Simple and beginner-friendly English passages.

### Medium

Conversational and professional English with more varied sentence structures.

### Hard

Advanced English containing:

* Technical terminology
* Complex sentences
* Numbers
* Punctuation
* Programming-related terminology
* Special characters

Content is selected dynamically so users don't have to repeatedly type the same short paragraph.

The application also ensures that enough content is available for longer **5-minute tests**.

---

## 🏆 Performance Ratings

After completing a test, users receive a performance rating based on their WPM.

|    WPM | Rating     |
| -----: | ---------- |
|   0–20 | Beginner   |
|  21–40 | Developing |
|  41–60 | Average    |
|  61–80 | Fast       |
| 81–100 | Advanced   |
|   100+ | Expert     |

The results screen also displays a motivational performance message.

---

## 📈 Statistics

Previous test results are stored locally so users can track their progress.

Statistics include:

* Best WPM
* Average WPM
* Best Accuracy
* Average Accuracy
* Total Tests
* Total Characters Typed
* Total Practice Time
* Recent WPM Performance

A performance chart makes it easy to see whether typing speed is improving over time.

---

## 🧠 Practice Mode

The application also includes a dedicated **Practice Mode** for users who want to practice without a fixed test duration.

Users can select:

* Easy
* Medium
* Hard

and continue practicing until they decide to stop.

---

## 🎨 Premium User Interface

The interface focuses on a clean and modern typing experience.

### UI Highlights

* Modern dark theme
* Premium typography
* Smooth animations
* Glass-style UI elements
* Responsive layout
* Interactive buttons
* Animated timer
* Progress indicators
* Live statistics
* Smooth transitions
* Mobile-friendly design

The UI is intentionally designed to remain focused and distraction-free while typing.

---

## ⌨️ Keyboard-Friendly

The application is designed around keyboard-first interaction.

Supported interactions include:

* `Enter` — Start / Restart where applicable
* `Escape` — Reset / Stop
* `Backspace` — Correct typing mistakes
* `Tab` — Navigate controls

The typing input automatically receives focus when the test begins.

---

## 🔊 Optional Sound Feedback

Users can optionally enable:

* Typing sounds
* Error sounds
* Completion sound

Sound effects are disabled by default to keep the typing environment distraction-free.

---

## 📱 Responsive Design

The application works across:

* 💻 Desktop
* 🖥️ Laptop
* 📱 Mobile
* 📟 Tablet

The interface automatically adapts to smaller screens while keeping the typing area comfortable and readable.

---

## 🛠️ Tech Stack

**Frontend**

* React
* JavaScript
* HTML5
* CSS3

**State & Storage**

* React State
* LocalStorage

**Deployment**

* Vercel

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── TypingTest/
│   ├── DifficultySelector/
│   ├── DurationSelector/
│   ├── TypingText/
│   ├── Timer/
│   ├── LiveStats/
│   ├── Results/
│   ├── Statistics/
│   └── PracticeMode/
│
├── data/
│   └── typingTexts/
│
├── utils/
│   └── typingCalculations/
│
└── App
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available on your local development server.

---

## 🌐 Live Demo

Try the application online:

### 👉 [Typing Speed Test — Live Demo](YOUR_VERCEL_LINK_HERE)

> Replace `YOUR_VERCEL_LINK_HERE` with the actual Vercel deployment URL after deployment.

---

## 🔮 Future Improvements

Possible future improvements include:

* 👤 User accounts
* ☁️ Cloud-based statistics
* 🏆 Global leaderboard
* 👥 Multiplayer typing races
* 🔥 Daily typing challenges
* 🏅 Achievements and badges
* 📅 Daily practice streaks
* 📊 Advanced performance analytics
* 🌍 Multiple languages
* 🎯 Custom typing passages
* 🥇 Personal records
* 📤 Shareable typing results

---

## 📸 Screenshots

Add screenshots of the application here after deployment.

```text
screenshots/
├── home.png
├── typing-test.png
├── results.png
└── statistics.png
```

---

## 👨‍💻 Developer

**Muhammad Irfan**

Computer Science Graduate & Web Developer

Focused on building modern and practical web applications using technologies such as **React, Next.js, JavaScript, Supabase, Django, PHP and SQL**.

---

<div align="center">

### ⚡ Type Faster. Type Smarter. Improve Every Day.

**Made with ❤️ and JavaScript**

</div>
