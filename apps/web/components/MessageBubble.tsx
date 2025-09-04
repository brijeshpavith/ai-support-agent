import { ReactNode } from "react";

export default function MessageBubble({ role, children }: { role: "user" | "assistant"; children: ReactNode }) {
const isUser = role === "user";
return (
<div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
<div style={{
maxWidth: 620,
padding: "10px 14px",
borderRadius: 12,
margin: "6px 0",
background: isUser ? "#1d264f" : "#0a1130",
border: "1px solid #222a55"
}}>
{children}
</div>
</div>
);
}