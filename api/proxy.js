export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
// Add + Vice Add
  const SCRIPT_URLS = {
    PlayerAdd: process.env.GOOGLE_SCRIPT_PLAYER_ADD || "https://script.google.com/macros/s/AKfycbx1BUof84d3nkbYgjyz7Xf8uH0eX5ZUVP7Yawj_MoOPTY4F9c_hq-779TPVIU1njkXcGg/exec",
    ViceAdd: process.env.GOOGLE_SCRIPT_VICE_ADD || "https://script.google.com/macros/s/AKfycbzBU1Nh1sLxk71At0GycVkxZlNGRwuvfKeh_a_mEO5CtXP6-F9LFgYBFSGNY8yrClHoAw/exec",
  };

  try {
    const action = req.headers["action"];
    const targetKey = Object.keys(SCRIPT_URLS).find(
      (key) => key.toLowerCase() === action?.toLowerCase()
    );

    const targetUrl = SCRIPT_URLS[targetKey];

    if (!targetUrl) {
      return res.status(400).json({
        error: `Invalid or missing 'action' header. Received: '${action || "none"}'`,
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
