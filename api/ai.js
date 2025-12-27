export default async function handler(req, res) {
  // التحقق من أن الطلب من نوع POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  // التحقق من وجود نص في الطلب
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // كما ظهر في صورتك
        messages: [
          { role: "system", content: "أنت مساعد ذكاء اصطناعي في لعبة تدمج بين علم النفس والفلسفة." },
          { role: "user", content: text },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
