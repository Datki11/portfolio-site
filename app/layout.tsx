import type { Metadata } from "next";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/600.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://danielatkinson.dev"),
  title: "Daniel Atkinson | Senior Full-Stack Engineer",
  description:
    "Senior full-stack engineer with 7+ years building web, mobile, and AI-powered products with React, TypeScript, C#/.NET, and AWS.",
  openGraph: {
    title: "Daniel Atkinson | Senior Full-Stack Engineer",
    description:
      "Web, mobile, and AI-powered products. React, TypeScript, C#/.NET, and AWS.",
    url: "https://danielatkinson.dev",
    siteName: "Daniel Atkinson",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
