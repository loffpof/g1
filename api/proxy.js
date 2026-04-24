export default async function handler(req, res) {
  // Your Google Apps Script URL goes here
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1BUof84d3nkbYgjyz7Xf8uH0eX5ZUVP7Yawj_MoOPTY4F9c_hq-779TPVIU1njkXcGg/exec";

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      redirect: "follow" // This is what fixes your redirect problem!
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
