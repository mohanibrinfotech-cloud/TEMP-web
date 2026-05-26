import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { commits } = req.body;

    const commitText = commits
      .map((c) => `- ${c.message}`)
      .join("\n");

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that converts GitHub commits into clean portfolio update summaries.",
          },
          {
            role: "user",
            content: `
Convert these commits into a short professional update:

${commitText}

Make it 3-5 bullet points max.
`,
          },
        ],
      });

    res.status(200).json({
      success: true,
      summary:
        completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Summarization failed",
    });
  }
}