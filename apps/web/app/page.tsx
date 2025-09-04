"use client";
import ChatWidget from "../components/ChatWidget";

export default function Page() {
return (
<div className="container">
<div className="stack">
<h1>AI Support Agent Demo</h1>
<p className="small">Client-side RAG + WebLLM with Vercel API fallback.</p>
<div className="card">
<ChatWidget />
</div>
<p className="small">Tip: first answer may be slower while models warm up. If your device lacks WebGPU or is slow, the app will auto-use the Vercel fallback.</p>
</div>
</div>
);
}