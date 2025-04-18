export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbyvItiJPCKa4Sq5nuAbM8FKiI3y-hq5YdSEgXgcA4x6LvZgUQ7P8XHkT587bCA2C3Sh/exec?action=load_tasks';

    const response = await fetch(scriptUrl);
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        throw new Error('Ответ не является массивом');
      }
      return res.status(200).json(data);
    } catch (jsonErr) {
      console.error('🛑 JSON parse error:', jsonErr);
      console.error('📦 Response:', text);
      return res.status(500).json({ error: 'Invalid JSON from script' });
    }
  } catch (err) {
    console.error('[load_tasks error]', err);
    return res.status(500).json({ error: 'Loading tasks failed' });
  }
}
