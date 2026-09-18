// Vercel serverless function — deployed automatically at POST /api/telegram
// because this file lives in /api at the project root.
//
// Required environment variables (set these in your Vercel project settings,
// NOT in any committed file):
//   TELEGRAM_BOT_TOKEN  — from @BotFather after creating a bot
//   TELEGRAM_CHAT_ID    — your personal chat id (message @userinfobot to get it)
//
// Why this exists as a serverless function instead of calling the Telegram
// API straight from Angular: the bot token must stay secret. Anything in
// frontend code ships to every visitor's browser, so a token embedded there
// could be copied and used to spam your bot or read your messages.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, subject, message, source } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({
      error: 'Telegram is not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your Vercel project environment variables.',
    });
    return;
  }

  const lines = [
    `📬 New message — ${source || 'Portfolio site'}`,
    name ? `Name: ${name}` : null,
    email ? `Email: ${email}` : null,
    subject ? `Subject: ${subject}` : null,
    '',
    message.trim(),
  ].filter((line) => line !== null);

  const text = lines.join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!tgRes.ok) {
      const details = await tgRes.text();
      res.status(502).json({ error: 'Telegram rejected the message', details });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach Telegram', details: String(err) });
  }
};
