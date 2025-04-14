export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzl-_4FlWDCTLwyqypHwiLKWHehLOsUmDOtA9YQ7JSjzgmRys0H9uk1eue4kcHnywfc/exec?action=load_tasks';

  try {
    const response = await fetch(scriptUrl);
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('Data is not array');
      res.status(200).json(data);
    } catch (parseError) {
      console.error('🛑 JSON parse error:', parseError, '\n📦 Response:', text);
      res.status(500).json({ error: 'Invalid JSON from script' });
    }

  } catch (err) {
    console.error('🛑 Fetch error in /api/load_tasks:', err);
    res.status(500).json({ error: 'Loading tasks failed' });
  }
}
