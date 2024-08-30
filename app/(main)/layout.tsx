import PageHeader from "@/components/organisms/page-header";
import { initialProfile } from "@/lib/initial-profile";
import React from "react";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const profile = await initialProfile();

  return (
    <div className="h-full">
      <PageHeader />
      {children}
    </div>
  );
}
