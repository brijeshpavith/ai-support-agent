import localforage from "localforage";

export type Vec = number[];
export type Chunk = { id: string; text: string; source?: string; title?: string; url?: string; vec?: Vec };

const store = localforage.createInstance({ name: "kb-index" });

export async function putChunks(chunks: Chunk[]) {
for (const c of chunks) {
await store.setItem(c.id, c);
}
}

export async function allChunks(): Promise<Chunk[]> {
const out: Chunk[] = [];
await store.iterate<Chunk, void>((value) => {
if (value) out.push(value);
});
return out;
}

export function cosine(a: Vec, b: Vec) {
let dot = 0, na = 0, nb = 0;
for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

export function topK(queryVec: Vec, chunks: Chunk[], k = 5) {
const scored = chunks.filter(c => c.vec).map(c => ({ c, score: cosine(queryVec, c.vec as Vec) }));
scored.sort((x, y) => y.score - x.score);
return scored.slice(0, k);
}