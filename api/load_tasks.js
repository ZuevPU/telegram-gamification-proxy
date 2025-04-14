export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwspegZdmoMOzAGWkRFyCKVfBdrLBTCJcf8H0CpRrxdNMeEYguFQHAtWmP7lEjxfJC1/exec?action=load_tasks';
  try {
    const response = await fetch(scriptUrl);
    const tasks = await response.json();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Loading tasks failed' });
  }
}
