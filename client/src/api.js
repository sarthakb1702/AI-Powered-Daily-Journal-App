// client/src/api.js
const BASE_URL = "https://ai-powered-daily-journal-app-7.onrender.com"; // Your backend URL

export const getEntries = async () => {
  const res = await fetch(`${BASE_URL}/api/entries`);
  return res.json();
};

export const postEntry = async (data) => {
  const res = await fetch(`${BASE_URL}/api/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
