import { GOOGLE_SCRIPT_URL } from './config';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=load_tasks`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid data format');
    res.status(200).json(data);
  } catch (err) {
    console.error('[load_tasks error]', err);
    res.status(500).json({ error: 'Loading tasks failed' });
  }
}
