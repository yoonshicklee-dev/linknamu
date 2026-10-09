import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={96}
        height={96}
        priority
        className="h-24 w-24 rounded-full border-2 border-foreground/10 object-cover"
      />
      <h1 className="mt-2 text-xl font-semibold">{name}</h1>
      <p className="text-sm text-foreground/70">{bio}</p>
    </header>
  );
}
