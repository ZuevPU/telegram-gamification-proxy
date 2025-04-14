import { GOOGLE_SCRIPT_URL } from '@/config';
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const scriptUrl = `${GOOGLE_SCRIPT_URL}?action=video`;
  try {
    const response = await fetch(scriptUrl);
    const tasks = await response.json();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Loading tasks failed' });
  }
}
