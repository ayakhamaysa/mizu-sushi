// ======================================================
// Serverless function: runs on Vercel's server, not in the browser.
// The page sends the chat here, and this function asks Gemini.
// The secret key (GEMINI_API_KEY) stays on the server.
// ======================================================

import { restaurant, categories, tags } from "../src/data/menu.js";

const MODEL = "gemini-3.5-flash-lite"; // fast and free on Google AI Studio
// streamGenerateContent + alt=sse: Gemini sends the answer in small pieces while it writes it
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;

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
- رسالة الترحيب ظاهرة للزبون من قبل. لا ترحّب أبداً، ادخل بالجواب مباشرة.
- لا تزيد جمل ختامية أو مجاملات، ولا تحكي عن مكان المطعم إلا إذا الزبون سأل.
- اقترح بس أصناف من المنيو تحت، بالاسم والسعر بالضبط. لا تخترع أصناف ولا أسعار ولا عروض.
- إذا سأل عن مصطلح (نيغيري، ساشيمي، رول، أنقليس، يوزو...) اشرحه بجملة بسيطة.
- انتبه لعلامة "سمك نيء": إذا الزبون ما بحب النيء، أو أول مرة، أو حامل، اقترح بس أصناف "مطبوخ" أو "نباتي".
- الأسعار بالدرهم الإماراتي. إذا حدد ميزانية أو عدد أشخاص: اختار الأصناف بحيث المجموع تحت الميزانية من أول مرة، واكتب الحساب رقم رقم (مثلاً: 65 + 45 + 45 = 155 درهم). لا تكتب تصحيحات أو "خليني أعدّل".
- عن الحساسية: احكي بوضوح أي أصناف مكتوب فيها المكوّن حسب المنيو، واقترح أصناف ما مكتوب فيها. قول إنه المكونات المكتوبة مش كاملة (مثلاً الصوصات والرز ممكن يكون فيهم مكونات تانية)، وانصحه يتأكد من الموظفين. لا تضمن إنه الصنف آمن.
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
        generationConfig: { temperature: 0.4, maxOutputTokens: 300 },
      }),
    });

    if (!response.ok) {
      // Send Gemini's own error back, so the problem is easy to find
      const data = await response.json().catch(() => ({}));
      console.error("Gemini error:", data.error?.message);
      return res.status(502).json({ error: `Gemini: ${data.error?.message || response.status}` });
    }

    // Pass every piece of text to the page as soon as it arrives
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Gemini sends lines like: data: {...json...}
      const lines = buffer.split("\n");
      buffer = lines.pop(); // the last line may be incomplete, keep it for the next round
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const chunk = JSON.parse(line.slice(6));
        const text = chunk.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
        if (text) res.write(text);
      }
    }
    return res.end();
  } catch (error) {
    console.error(error);
    if (res.headersSent) return res.end();
    return res.status(500).json({ error: "Server error" });
  }
}
