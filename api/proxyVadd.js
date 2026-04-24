export default async function handler(req, res) {

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6lG_wVwBhNLb6N8R8-7N624PM_N7DrwiUTxl9Jf6h9DGmLPJmbjFZZW23UXKgA1yM_g/exec";

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
