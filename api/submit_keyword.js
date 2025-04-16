// ✅ /api/submit_keyword.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });
  const { user_id, keyword } = req.body;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyQeyN0l-sRr674cS8nnJoV9ag_Gve6Fs2anJrCqSJEzcKMxzXcchICogpZ3EbpW-EZ/exec?action=keyword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, keyword })
    });
    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Google Script error' });
  }
}
