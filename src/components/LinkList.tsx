"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => setCounts((prev) => ({ ...prev, ...data })))
      .catch(() => {
        // 불러오지 못하면 0회 표시를 유지
      });
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 먼저 화면에 +1 반영하고, 서버 응답이 오면 실제 값으로 맞춘다
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch(`/api/clicks/${encodeURIComponent(id)}`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count: number }) => setCounts((prev) => ({ ...prev, [id]: data.count })))
      .catch(() => {
        setCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 1) - 1) }));
      });
  }

  return (
    <ul className="flex w-full flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            clickCount={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
