import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
try {
const { query, contextChunks } = await req.json();
if (!query || !Array.isArray(contextChunks) || contextChunks.length === 0) {
return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
}

const maxChunkChars = 1200;
const trimmed = contextChunks.slice(0, 5).map((c: any) => ({
text: String(c.text || "").slice(0, maxChunkChars),
title: c.title || "Doc",
url: c.url || c.source || "local"
}));

const system = [
"You are a helpful support agent.",
"Answer ONLY from the provided CONTEXT.",
"If not in context, say you don't have that info and suggest escalation.",
"Cite sources using [#] where # maps to the sources list."
].join(" ");

const sources = trimmed.map((c: any, i: number) => `[${i + 1}] ${c.title} - ${c.url}`).join("\n");
const contextBlock = trimmed.map((c: any, i: number) => `[#${i + 1}] ${c.text}`).join("\n---\n");

const messages = [
{ role: "system", content: system },
{ role: "user", content: `CONTEXT:\n${contextBlock}\n\nSOURCES:\n${sources}\n\nUSER QUESTION:\n${query}\n\nRESPONSE FORMAT:\n- Direct answer based only on CONTEXT\n- Include citations like [#]\n- If insufficient info, say so briefly and suggest escalation.` }
];

const res = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.OPENAI_API_KEY!}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages,
temperature: 0.2,
max_tokens: 500,
stream: true
})
});

if (!res.ok) {
return new Response(await res.text(), { status: res.status });
}

return new Response(res.body, {
headers: {
"Content-Type": "text/event-stream",
"Cache-Control": "no-cache",
"Connection": "keep-alive"
}
});
} catch (e: any) {
return new Response(JSON.stringify({ error: e.message || "error" }), { status: 500 });
}
}