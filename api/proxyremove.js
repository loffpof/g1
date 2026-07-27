export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const SCRIPT_URLS = {
    PlayerRemove: "https://script.google.com/macros/s/AKfycbz8zp29BiK4BtTjSaU_7F22c7wO44SegSTwXZ2SAWKCm-S59w2AXJCuilhGqxcsDEP1bw/exec",
    ViceRemove: "https://script.google.com/macros/s/AKfycbw_w2qv6mmO86iFHS7PzkZQ_YLboMh9PmxwOZtHTxGxNL2a-h_4cGlshUusaX4lgM8m/exec",
  };

  try {
    const action = req.headers["action"];

    const targetKey = Object.keys(SCRIPT_URLS).find(
      (key) => key.toLowerCase() === action?.toLowerCase()
    );

    const targetUrl = SCRIPT_URLS[targetKey];

    if (!targetUrl) {
      return res.status(400).json({
        error: `Invalid or missing 'action' header for Removal. Received: '${action || "none"}'`,
      });
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
