export default async function handler(req, res) {
  if(req.method !== "POST"){
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if(!text) return res.status(400).json({ error: "No text provided" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages:[
          { role:"system", content:"أنت مساعد نفسي هادئ، تحلل المشاعر وترد بلطف ووعي." },
          { role:"user", content: text }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch(err) {
    res.status(500).json({ error: "AI error" });
  }
}
