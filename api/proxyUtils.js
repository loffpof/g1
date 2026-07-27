export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
// Force Add, Force Remove, Auto Remove, and Update a user
  const SCRIPT_URLS = {
    ForceAdd: process.env.GOOGLE_SCRIPT_FORCE_ADD || "https://script.google.com/macros/s/AKfycbyeGq2oYA9LYoYhfx7OhjAeROKuHhT95NskTS97ACGzxxIYAuhgQ96QOaGWo8YNH31_MQ/exec",
    ForceRemove: process.env.GOOGLE_SCRIPT_FORCE_REMOVE || "https://script.google.com/macros/s/AKfycbywaRk4i2Z_xhDJ2itErpr5e-xtaFtEHcxjuFBeAV-3lmmADeA-c_zNZ08Of8WKkWXZ6g/exec",
    AutoRemove: process.env.GOOGLE_SCRIPT_AUTO_REMOVE || "https://script.google.com/macros/s/AKfycbyCDmBKaViNuCoYZjy7AH5yUTKpsWmcNwA_An8c3QdVxsVQzouUbbGvwAPBdE6R8QGPgA/exec",
    Update: process.env.GOOGLE_SCRIPT_UPDATE || "https://script.google.com/macros/s/AKfycbz_2rFL_wxPzVZLPsDbTO5HzmU6Ennf_PImUCvMOq9IvWQ2JSLYKaSCDfNoovfbvdzBIg/exec",
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
