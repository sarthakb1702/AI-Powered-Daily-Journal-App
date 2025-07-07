# 🧠 AI-Powered Daily Journal App

This web application allows users to write and save daily journal entries, which are then analyzed by OpenAI's GPT model to generate a summary and detect the user’s mood. Entries are stored in MongoDB and displayed in a timeline format.

---

## 🚀 Features

- 📝 Write and save daily journal entries
- 🤖 AI-generated summaries and mood detection using OpenAI API
- 📅 View entries in a chronological timeline
- ☁️ Data stored in MongoDB Atlas

---

## 🛠️ Tech Stack

| Frontend     | Backend      | Database | AI Integration |
|--------------|--------------|----------|----------------|
| React (client) | Node.js + Express (server) | MongoDB Atlas | OpenAI GPT API |

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/journal-app.git
cd journal-app
```
### 2.Install backend dependencies
```bash
cd server
npm install
```
### 3. Create a .env file in the server/ directory
```
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```
### 4. Start the backend server
```
npm start
```
### 5. Install frontend dependencies and run
```
cd ../client
npm install
npm start
```
