// ✅ /api/submit_user.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });
  const { user_id, username } = req.body;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyvItiJPCKa4Sq5nuAbM8FKiI3y-hq5YdSEgXgcA4x6LvZgUQ7P8XHkT587bCA2C3Sh/exec?action=submit_user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, username })
    });
const json = await response.json();
res.status(200).json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Google Script error' });
  }
}
