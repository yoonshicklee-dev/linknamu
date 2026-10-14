import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 모든 링크의 클릭 수를 { [linkId]: count } 형태로 반환
export async function GET() {
  await connection();

  const ids = profile.links.map((link) => link.id);
  const clicks = await getClicksCollection();
  const docs = await clicks.find({ _id: { $in: ids } }).toArray();

  const counts: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
  for (const doc of docs) {
    counts[doc._id] = doc.count;
  }

  return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
}
