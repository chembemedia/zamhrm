import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZamConnect People | Human Capital Intelligence",
  description: "People. Skills. Opportunity. Connected."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
