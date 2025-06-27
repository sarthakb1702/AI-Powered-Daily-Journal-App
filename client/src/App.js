// client/src/App.js
import React, { useEffect, useState } from "react";
import { getEntries, postEntry } from "./api";

function App() {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    getEntries().then(setEntries).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry = await postEntry({ content });
    setEntries([newEntry, ...entries]);
    setContent("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>📝 Daily Journal</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          style={{ width: "100%", padding: "1rem" }}
          placeholder="How was your day?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit Entry
        </button>
      </form>

      <hr />

      <h2>📅 Previous Entries</h2>
      {entries.map((entry) => (
        <div key={entry._id} style={{ marginBottom: "2rem" }}>
          <p><strong>Content:</strong> {entry.content}</p>
          <p><strong>Summary:</strong> {entry.summary}</p>
          <p><strong>Mood:</strong> {entry.mood}</p>
          <p><em>{new Date(entry.createdAt).toLocaleString()}</em></p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
