import { auth } from "@clerk/nextjs/server";
import Header from '@/components/header';

export default async function HausbotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { userId, orgId, orgRole, orgSlug } = await auth();
  // console.log("User ID in layout:", userId);
  // console.log("Org ID in layout:", orgId);
  // console.log("Org Role in layout:", orgRole);
  // console.log("Org Slug in layout:", orgSlug);
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-background text-foreground">
        <Header />
        {children}
    </div>
  )
}
