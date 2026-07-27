export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

// /rvlcaptainchange, /rvlteamnamechange, /rvlsnake | /rvlselfremove is connected to proxyUtils
  const SCRIPT_URLS = {
    CaptainChange: process.env.GOOGLE_SCRIPT_CAPTAIN_CHANGE || "https://script.google.com/macros/s/AKfycbxoXdXFSwDrArVjnERudf8dMSRHge08rt7koSGo59wgUdGSvrIs99yhJLAy_v3z3PwJrw/exec",
    TeamNameChange: process.env.GOOGLE_SCRIPT_TEAM_NAME_CHANGE || "https://script.google.com/macros/s/AKfycbz7Z_yXHLQ0X7CjdVC8U5zhriSDjkOuqroy-bKsD_eXcthwBH4M-HJjfZzOybJh_Z2bZg/exec",
    PlayerSnake: process.env.GOOGLE_SCRIPT_PLAYER_SNAKE || "https://script.google.com/macros/s/AKfycbxLecxLghz3LbKBR-r0tkbDpHe7gU6OVQojT5Ck7jbdVPBdCQb_Yt7E1wGun2lV4XYl1A/exec",
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
