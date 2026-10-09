type LinkCardProps = {
  title: string;
  url: string;
};

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border-2 border-foreground/80 px-5 py-4 text-center font-medium transition-colors hover:bg-foreground hover:text-background active:scale-[0.99]"
    >
      {title}
    </a>
  );
}
