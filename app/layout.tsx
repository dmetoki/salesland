import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { CalendarProvider } from "@/context/calendar-context";

export const metadata: Metadata = {
  title: "HausBot",
  description: "The AI-powered assistant saales representatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_live_Y2xlcmsuaGF1c2JvYXJkLmNvbSQ'}>
      <CalendarProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" enableSystem={true} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
      </CalendarProvider>
    </ClerkProvider>
  );
}