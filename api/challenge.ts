import type { VercelRequest, VercelResponse } from "@vercel/node";

// Runs server-side only — GROQ_API_KEY never reaches the browser.
// Set it in Vercel: Project Settings -> Environment Variables -> GROQ_API_KEY

const CATEGORY_LABELS: Record<string, string> = {
  scenario: "Scenario",
  personality: "Personality",
  relationship: "Relationship",
  funny: "Funny",
  romance: "Romance",
};

const CATEGORY_INSTRUCTIONS: Record<string, string> = {
  scenario:
    "Write a 'what would they most likely do' hypothetical scenario question. Describe a specific situation the character could face, and give 4 possible reactions — only one truly fits their personality and abilities.",
  personality:
    "Write a question that tests understanding of the character's personality. The question should ask which trait, behavior, or attitude best describes them, or how they'd react emotionally in a situation. Do NOT ask about their powers or plot events.",
  relationship:
    "Write a question about the character's relationships, role, or bonds with their teammates, crew, family, or rivals. Focus on WHO they're connected to and HOW, not on their abilities.",
  funny:
    "Write a lighthearted, comedic hypothetical question — something absurd or mundane (e.g. doing taxes, ordering food, a normal Tuesday) contrasted against the character's over-the-top personality or powers. Keep it silly, not serious.",
  romance:
    "Write a question about how the character would react in a romantic or emotionally vulnerable moment (e.g. receiving a compliment, a crush, an awkward confession). Base it on their personality traits, not their combat abilities.",
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

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured on the server" });
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
  const categoryInstruction = CATEGORY_INSTRUCTIONS[categoryId];

  if (!categoryInstruction) {
    return res.status(400).json({ error: `Unsupported category: ${categoryId}` });
  }

  const guardrail =
    categoryId === "romance"
      ? "Keep this strictly PG: only crushes, blushing, denial, or light awkwardness. No sexual or explicit content of any kind."
      : "";

  const systemPrompt = `You generate one multiple-choice trivia question for an anime-character party game called AnimeMind Arena.
Respond with ONLY raw JSON, no markdown fences, no commentary, exactly matching this shape:
{"question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}

Requirements:
- Exactly 4 options, only one is correct.
- correctIndex is the 0-based index of the correct option.
- The question MUST match the category instruction given — do not write a generic trivia question.
- Keep the question under 25 words and each option under 12 words.`;

  const userPrompt = `Character: ${character.name} (${character.anime})
Traits: ${character.traits.join(", ")}
Abilities: ${character.abilities.join(", ")}

Category: ${categoryLabel}
Instruction for this category: ${categoryInstruction}
${guardrail}
Difficulty: ${difficulty || "medium"}`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 400,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(`Groq API error ${groqRes.status}: ${errText}`);
    }

    const data = await groqRes.json();
    const text: string = data?.choices?.[0]?.message?.content || "";
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

    // Always set category ourselves — never trust the model to echo it correctly
    parsed.category = categoryId;

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("challenge.ts error:", err);
    return res.status(502).json({ error: "Failed to generate challenge", detail: String(err) });
  }
}