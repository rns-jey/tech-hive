import PageHeader from "@/components/organisms/page-header";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <PageHeader />
      {children}
    </div>
  );
}
