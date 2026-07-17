import type { VercelRequest, VercelResponse } from "@vercel/node";

// Runs server-side only — GEMINI_API_KEY never reaches the browser.
// Set it in Vercel: Project Settings -> Environment Variables -> GEMINI_API_KEY

const CATEGORY_LABELS: Record<string, string> = {
  scenario: "Scenario",
  personality: "Personality",
  relationship: "Relationship",
  funny: "Funny",
  romance: "Romance",
};

interface Character {
  name: string;
  anime: string;
  traits: string[];
  abilities: string[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
  }

  const { character, categoryId, difficulty } = req.body as {
    character: Character;
    categoryId: string;
    difficulty?: string;
  };

  if (!character || !categoryId) {
    return res.status(400).json({ error: "Missing character or categoryId" });
  }

  const categoryLabel = CATEGORY_LABELS[categoryId] || categoryId;
  const guardrail =
    categoryId === "romance"
      ? "Keep this strictly PG: only crushes, blushing, denial, or light awkwardness. No sexual or explicit content of any kind."
      : "";

  const prompt = `You are generating one multiple-choice trivia question for an anime-character party game called AnimeMind Arena.

Character: ${character.name} (${character.anime})
Traits: ${character.traits.join(", ")}
Abilities: ${character.abilities.join(", ")}
Category: ${categoryLabel}
Difficulty: ${difficulty || "medium"}
${guardrail}

Return ONLY raw JSON, no markdown fences, no commentary, exactly matching this shape:
{"category":"${categoryId}","question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}

Requirements:
- Exactly 4 options, only one is correct.
- correctIndex is the 0-based index of the correct option.
- Question must be answerable using the character info above (don't require outside canon trivia beyond common knowledge).
- Keep the question under 25 words and each option under 12 words.`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      throw new Error(`Gemini API error ${geminiRes.status}: ${errText}`);
    }

    const data = await geminiRes.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (
      !parsed.question ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      typeof parsed.correctIndex !== "number"
    ) {
      throw new Error("Malformed model response");
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("challenge.ts error:", err);
    return res.status(502).json({ error: "Failed to generate challenge", detail: String(err) });
  }
}
