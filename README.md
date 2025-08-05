# 🤖 BB Guide Bot – Learning Telegram Bot Building

A dynamic learning assistant built on the [Bots.Business](https://app.bots.business) platform, the BB Guide Bot teaches users how to create their own Telegram bots using **interactive lessons, in-chat quizzes, level-up celebrations**, and a **WebApp-based profile system**.

Bots's Username - [@BBdocumentBot](https://t.me/BBdocumentBot)

---

## 🌟 Features

- 📚 **Interactive Lessons**  
  Learn step-by-step how to build Telegram bots using Bots.Business platform.

- 🧩 **End-of-Step Quizzes**  
  Quizzes after every key step to test knowledge and unlock progress.

- 🏆 **Live Leaderboard**  
  Tracks top learners by level and score.

- 🎉 **Level-Up Celebrations**  
  Fun animations and XP system for streaks and quiz success.

- 🖥️ **WebApp Interface**  
  Integrated Telegram WebApp for profile, streak tracker, and commands.

- 📈 **Daily Login Streak System**  
  Encourages continuous learning by rewarding consistency.

---

## 🛠️ Admin Panel

The bot supports auto and manual content loading from Google Sheets.

### ⏱️ Auto-Import (Every 24 Hours)

These sheets are automatically fetched and updated every 24 hours:

| Type       | Source Link | Auto-Update | Manual Command |
|------------|-------------|-------------|----------------|
| 📚 Quiz    | [Quiz Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vRN45jXZVX6JSlGgy9ql21wpnVGT5pnIWpSMjX0fhF8uRtbKuJIovaCBKm8Y29w4lUPGvh7QN3NoMpd/pubhtml) | ✅ | `/setup1` |
| 🧩 Lessons | [Lesson Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vSmaKqhLNlgXZ98D-GfQW8Ou-aRPRVcPuFKzvsUxyEroRtx7CmCBXh2cKrOAok46c7qhBlwzcBNVEqU/pubhtml) | ✅ | `/setup`  |
| 📦 Version | [Version Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vSV4wjczHHduVgsbDY8wFTfIV7Qb0kk8pkQ69W1T1kIf6v1HTO7FUADShXrDFmUh9rw3_v3YA0lh-cU/pubhtml) | ✅ | `/setup2` |

---

### 🔐 Manual Update Access

To run manual `/setup`, `/setup1`, or `/setup2` commands, you **must be the bot owner**.  
To set yourself as an admin:

1. Open `login.js`
2. Update the first line:

```js
let allowedAdmins = [6140468904, 123456789]; // ✅ Replace with your Telegram user IDs
```

3. To find your Telegram ID, use: [@chat\_id\_echo\_bot](https://t.me/chat_id_echo_bot)

---

## 📄 Google Sheet Formats

### 🧩 Lesson Sheet Format

| id | step | title           | description                  | text                                    | photo                                                                          | YouTube Video                                                                              | Help                                                                                     | extra (JSON)                                                     |
| -- | ---- | --------------- | ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| L1 | 1    | Getting Started | How to create your first bot | Open Telegram and search for @BotFather | `https://telegrambots.github.io/book/1/docs/logo-bot-father.jpg`               | [https://www.youtube.com/watch?v=MZixi8oIdaA](https://www.youtube.com/watch?v=MZixi8oIdaA) | [https://help.bots.business/getting-started](https://help.bots.business/getting-started) | `[{"text": "Open @BotFather", "url": "https://t.me/BotFather"}]` |
| L1 | 2    |                 |                              | When BotFather asks, send `/newbot`     | `https://8upload.com/image/686e1f4866514/16fe52bb103f3c23a82c507d742d96bc.png` |                                                                                            | [https://help.bots.business/getting-started](https://help.bots.business/getting-started) |                                                                  |

### 📚 Quiz Sheet Format

| lesson\_id | step | question                             | options                             | answer        |
| ---------- | ---- | ------------------------------------ | ----------------------------------- | ------------- |
| L1         | 2    | What is the command to create a bot? | /start;/help;/newbot                | /newbot       |
| L1         | 4    | Where to find @BotFather?            | Telegram App;WhatsApp;Instagram     | Telegram App  |
| L2         | 2    | What does Bot.sendMessage do?        | Sends photo;Sends message;Stops bot | Sends message |
| L3         | 2    | What is mainMenu in this code?       | Command;Name;James Bond             | Command       |

### 📦 Version/Meta Sheet Format

| key               | value      |
| ----------------- | ---------- |
| version           | v6.9.5     |
| template\_version | 1.5        |
| lang              | en         |
| updated\_at       | 20.07.2025 |

---

## 🖼️ Screenshots & Media

| Description        | Preview                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| 🤖 Bot DP          | ![Bot DP](https://8upload.com/image/6885c7bd97f5d/e26a1bc8a65c4d236202556320bfc60c.png)         |
| 🚀 Starting Screen | ![Start Screen](https://8upload.com/image/688ac9fe93714/f9d259ffd6dcc42d7480f396fa27d604.png)   |
| 👤 Profile WebApp  | ![Profile WebApp](https://8upload.com/image/68921a5bb2f93/a71cefa4664330ef6a811704e311e030.png) |

---

## 👨‍💻 Developer

* Developer: [@TryToLiveAlone_Backup](https://t.me/TryToLiveAlone_Backup)
* Platform: [Bots.Business](https://app.bots.business)
* Language: `bjs`
* Hosting: BB cloud

