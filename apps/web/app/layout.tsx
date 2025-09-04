import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
title: "AI Support Agent Demo",
description: "Client-first RAG + WebLLM with Vercel fallback",
};

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body>{children}</body>
</html>
);
}