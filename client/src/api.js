const BASE_URL = "https://ai-powered-daily-journal-app-7.onrender.com";

export async function fetchEntries() {
  const res = await fetch(`${BASE_URL}/api/entries`);
  return res.json();
}

export async function submitEntry(entry) {
  const res = await fetch(`${BASE_URL}/api/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return res.json();
}
