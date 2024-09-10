export default async function PageLayout({ children }: { children: React.ReactNode }) {
  return <main className="px-8 pt-20 m-auto max-w-[1440px]">{children}</main>;
}
