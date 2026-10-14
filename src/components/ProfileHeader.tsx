import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={112}
        height={112}
        priority
        className="h-28 w-28 rounded-full object-cover ring-4 ring-(--avatar-ring) shadow-(--avatar-shadow)"
      />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{bio}</p>
    </header>
  );
}
