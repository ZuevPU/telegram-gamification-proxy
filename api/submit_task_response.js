// ✅ /api/submit_task_response.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });
  const { user_id, username, url, task } = req.body;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzO-qc4Sc-B7BnEGL8fSQUkE6v7rUVL-spPkm9rU5urnA2HKKjsi8zmz7kjGrH5ZBcA/exec?action=submit_response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, username, url, task })
    });
    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Google Script error' });
  }
}
