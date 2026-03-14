import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://specialtyrx-connect.vercel.app"),
  title: {
    default: "SpecialtyRx Connect",
    template: "%s | SpecialtyRx Connect"
  },
  description:
    "A specialty medication operations workspace for enrollment, access, financial assistance, and provider coordination.",
  openGraph: {
    title: "SpecialtyRx Connect",
    description:
      "Coordinate specialty medication onboarding, prior auth, coverage verification, and patient communications from one workspace.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored === 'dark' || stored === 'light'
                    ? stored
                    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  var root = document.documentElement;
                  root.classList.toggle('dark', theme === 'dark');
                  root.style.colorScheme = theme;
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
