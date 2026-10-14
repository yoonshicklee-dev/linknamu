import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-12 px-6 pt-20 pb-16 sm:gap-14 sm:pt-28">
      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
      <LinkList links={profile.links} />
    </main>
  );
}
