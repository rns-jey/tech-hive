import PageHeader from "@/components/organisms/page-header";
import { initialProfile } from "@/lib/initial-profile";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const profile = await initialProfile();

  return (
    <>
      <PageHeader />
      {children}
    </>
  );
}
