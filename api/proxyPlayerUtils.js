export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
// /rvlupdate, /rvlcaptainchange, /rvlteamnamechange, /rvlsnake, /rvlselfremove,
  const SCRIPT_URLS = {
    PlayerUpdate: process.env.GOOGLE_SCRIPT_PLAYER_UPDATE || "https://script.google.com/macros/s/YOUR_PLAYER_UPDATE_ID/exec",
    CaptainChange: process.env.GOOGLE_SCRIPT_CAPTAIN_CHANGE || "https://script.google.com/macros/s/YOUR_CAPTAIN_CHANGE_ID/exec",
    TeamNameChange: process.env.GOOGLE_SCRIPT_TEAM_NAME_CHANGE || "https://script.google.com/macros/s/YOUR_TEAM_NAME_CHANGE_ID/exec",
    PlayerSnake: process.env.GOOGLE_SCRIPT_PLAYER_SNAKE || "https://script.google.com/macros/s/YOUR_PLAYER_SNAKE_ID/exec",
    SelfRemove: process.env.GOOGLE_SCRIPT_SELF_REMOVE || "https://script.google.com/macros/s/YOUR_SELF_REMOVE_ID/exec",
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
