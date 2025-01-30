import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const Font = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SVG Pattern Generator",
  description: "Generate SVG patterns. Easy setup and compatible with TailwindCSS.",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/svg-pattern-generator-logo-light.svg',
        href: '/svg-pattern-generator-logo-light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/svg-pattern-generator-logo-dark.svg',
        href: '/svg-pattern-generator-logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={Font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
