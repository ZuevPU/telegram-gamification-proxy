const GAS_URL = 'https://script.google.com/macros/s/AKfycbzjSSb5TAZVupX0FsParQsw2R5bPNgaunOUO6JJZfXAcDeqQ2ASDZ9LeiRL4GvOnWAY/exec';

export default async function handler(req, res) {
    const allowedOrigin = 'https://zuevpu.github.io';

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { user_id } = req.query;

    if (!user_id) {
        res.status(400).json({ status: 'error', message: 'Missing user_id' });
        return;
    }

    try {
        const response = await fetch(`${GAS_URL}?action=get_user_lots&user_id=${user_id}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Ошибка при получении лотов:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}
