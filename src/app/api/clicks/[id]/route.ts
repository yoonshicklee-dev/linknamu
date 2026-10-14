import type { NextRequest } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 해당 링크의 클릭 수를 1 올리고 갱신된 값을 반환
export async function POST(_req: NextRequest, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // 등록된 링크만 집계해서 임의의 문서가 생기지 않게 한다
  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  const clicks = await getClicksCollection();
  const doc = await clicks.findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );

  return Response.json({ id, count: doc?.count ?? 1 });
}
