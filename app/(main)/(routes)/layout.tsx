import PageHeader from "@/components/organisms/page-header";
import { initialProfile } from "@/lib/initial-profile";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const profile = await initialProfile();

  return <main className="px-8 pt-20 m-auto max-w-[1440px]">{children}</main>;
}
