export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_w2qv6mmO86iFHS7PzkZQ_YLboMh9PmxwOZtHTxGxNL2a-h_4cGlshUusaX4lgM8m/exec";

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      redirect: "follow" 
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
