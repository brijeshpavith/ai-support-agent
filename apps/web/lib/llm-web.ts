import { pipeline } from "@xenova/transformers";

let embedder: any;

export async function loadEmbedder() {
if (!embedder) {
embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
}
return embedder;
}

export async function embed(text: string): Promise<number[]> {
const emb = await (await loadEmbedder())(text, { pooling: "mean", normalize: true });
return Array.from(emb.data);
}