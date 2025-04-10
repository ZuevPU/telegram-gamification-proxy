export default async function handler(req, res) {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxsWmjMEKQlsRaz-ELm3Qj70ryi4YJ9f4SVv3679CfGC4q9mqDjTJ5tRWJeY1s4bj2J/exec';

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST allowed' });
  }

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
