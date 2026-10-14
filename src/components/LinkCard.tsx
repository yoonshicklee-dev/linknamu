type LinkCardProps = {
  title: string;
  url: string;
  clickCount: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, clickCount, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-(--card-border) bg-(--card-bg) px-16 py-4.5 text-center text-[15px] font-medium shadow-(--card-shadow) backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-(--card-bg-hover) hover:shadow-(--card-shadow-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {title}
      <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal tabular-nums text-muted">
        {clickCount.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
