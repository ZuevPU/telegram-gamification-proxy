export default async function handler(req, res) {
  // 🔐 Добавляем CORS-заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Ответ на preflight-запрос
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST allowed' });
  }

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzk9yz6BmO1ZKGvMEYLW_h6JJlpZAcipgM9rd4ul3kqZlHOyLqO7NUatmcOcAhZFN-2/exec';

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обращении к Google Script' });
  }
}
