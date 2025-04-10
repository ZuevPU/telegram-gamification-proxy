export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST allowed' });
  }

  const { user_id, keyword } = req.body;
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwUg0_z35KtnD9vd0xvLa5orArM0LtgwcrYTqxt2l6hjuxK_zvGLHTyzxgu0vH_UuQB/exec';

  try {
    const response = await fetch(scriptUrl + '?action=keyword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, keyword })
    });

    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обращении к Google Script' });
  }
}
