// ======================================================
// Serverless function: runs on Vercel's server, not in the browser.
// The page sends the chat here, and this function asks Gemini.
// The secret key (GEMINI_API_KEY) stays on the server.
// ======================================================

import { restaurant, categories, tags } from "../src/data/menu.js";

const MODEL = "gemini-3.5-flash-lite"; // fast and free on Google AI Studio
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// The menu as plain text, from the same file the page uses
const menuText = categories
  .map((category) => {
    const items = category.items
      .map((item) => {
        const itemTags = item.tags.map((t) => `${tags[t].ar} / ${tags[t].en}`).join("، ");
        const about = item.description ? ` — ${item.description} / ${item.descriptionEn}` : "";
        return `- ${item.name} (${item.nameEn}): ${item.price} درهم إماراتي (AED) [${itemTags}]${about}`;
      })
      .join("\n");
    return `${category.titleAr} (${category.title})${category.noteAr ? ` — ${category.noteAr}` : ""}:\n${items}`;
  })
  .join("\n\n");

// The rules the assistant follows (the "system prompt")
// lang: "ar" or "en", the language the customer chose on the page
const instructions = (lang) => `
إنت "الشيف"، مساعد مطعم ${restaurant.name} للسوشي والمطبخ الآسيوي في ${restaurant.ar.city} بالإمارات.
شغلك تساعد الزبون يختار، وخصوصاً اللي أول مرة بياكل سوشي.

القواعد:
- ${lang === "en" ? "Reply in clear, friendly English. Use the English dish names." : "احكي باللهجة الفلسطينية واستعمل الأسماء العربية للأصناف."}
- خليك لطيف ومختصر (4 أسطر أو أقل). إذا الزبون كتب بلغة تانية، جاوبه بلغته.
- اقترح بس أصناف من المنيو تحت، بالاسم والسعر بالضبط. لا تخترع أصناف ولا أسعار ولا عروض.
- إذا سأل عن مصطلح (نيغيري، ساشيمي، رول، أنقليس، يوزو...) اشرحه بجملة بسيطة.
- انتبه لعلامة "سمك نيء": إذا الزبون ما بحب النيء، أو أول مرة، أو حامل، اقترح بس أصناف "مطبوخ" أو "نباتي".
- الأسعار بالدرهم الإماراتي. إذا حدد ميزانية أو عدد أشخاص، اجمع الأسعار صح وخليك تحت الميزانية، واكتب المجموع.
- عن الحساسية: احكي المكونات المكتوبة بس، وانصحه يتأكد من الموظفين.
- إذا سأل عن إشي ما إله علاقة بالمطعم، رجّعه بلطف للمنيو.
- معلومات المطعم: ${restaurant.ar.address}. ${restaurant.ar.hours}. للحجز: ${restaurant.phone}.

المنيو:
${menuText}
`;

export default async function handler(req, res) {
  // Clear message if the key was not added (.env.local on your computer, Environment Variables on Vercel)
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  // The chat so far: [{ role: "user" | "assistant", text: "..." }, ...]
  const messages = req.body?.messages;
  const lang = req.body?.lang === "en" ? "en" : "ar";
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages" });
  }

  // Keep only the last 8 messages and cut long ones (protects the free quota)
  const contents = messages.slice(-8).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: String(m.text).slice(0, 500) }],
  }));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY, // set on Vercel, never in the code
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions(lang) }] },
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 350 },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      // Send Gemini's own error back, so the problem is easy to find
      console.error("Gemini error:", data.error?.message);
      return res.status(502).json({ error: `Gemini: ${data.error?.message || response.status}` });
    }

    const answer = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
