const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKlFMbvz8vMV2qtsgJTUuqEc2GtjBw11k_KQ8EiOMyr-5Q08r3JuPSeDquYMv3_wo9/exec';

export default async function handler(req, res) {
    const allowedOrigin = 'https://zuevpu.github.io';

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
        return;
    }

    try {
        const { user_id, username, lot_name } = req.body;

        if (!user_id || !username || !lot_name) {
            res.status(400).json({ status: 'error', message: 'Missing required parameters: user_id, username, lot_name' });
            return;
        }

        const gasResponse = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=buy_lot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, username, lot_name }),
        });

        if (!gasResponse.ok) {
            const errorText = await gasResponse.text();
            console.error('Ошибка от Google Apps Script:', gasResponse.status, errorText);
            res.status(gasResponse.status).json({ status: 'error', message: `Ошибка от внутреннего сервиса: ${errorText}` });
            return;
        }

        const gasData = await gasResponse.json();
        res.status(200).json(gasData);

    } catch (error) {
        console.error('Ошибка в buy_lot Vercel функция:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}
