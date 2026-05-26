import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { commits } = req.body;

    const commitText = commits
      .map((c, i) => `${i + 1}. ${c.message}`)
      .join("\n");

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a senior software engineer writing portfolio updates for a professional developer profile.

Your job is to transform raw Git commit messages into polished, impact-driven bullet points that:
- Highlight WHAT was built and WHY it matters (not just what changed)
- Use strong action verbs (Built, Shipped, Optimized, Integrated, Refactored, Designed)
- Sound human and confident — not robotic or overly formal
- Are suitable for a portfolio, resume, or LinkedIn post
- Group related commits into a single meaningful bullet when possible

Strict rules:
- Output ONLY the bullet points, no intro or closing text
- Maximum 5 bullet points
- Each bullet: one sentence, under 20 words
- Never mention file names, branch names, or commit hashes
- Never use vague words like "updated", "fixed stuff", or "made changes"`,
        },
        {
          role: "user",
          content: `Here are the raw Git commits from my latest work session:

${commitText}

Convert these into sharp, portfolio-ready bullet points that showcase real engineering progress.`,
        },
      ],
      temperature: 0.6,       // balanced: creative but consistent
      max_tokens: 300,        // enough for 5 punchy bullets
      top_p: 0.9,
    });

    res.status(200).json({
      success: true,
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Summarization failed",
    });
  }
}