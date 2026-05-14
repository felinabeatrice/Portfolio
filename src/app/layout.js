import NoZoom from "@/components/NoZoom";
import { Manrope, Bitcount_Single, Space_Grotesk } from "next/font/google";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const bitcount = Bitcount_Single({
  subsets: ["latin"],
  variable: "--font-bitcount",
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "FB | Felina Beatrice",
  description: "PERN Stack Developer Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bitcount.variable} ${spaceGrotesk.variable}`}
    >
            <body
        style={{
          margin: 0,
          padding: 0,
          background: "#271a38",
          color: "#76dbdb",
          fontFamily: "var(--font-manrope), sans-serif",
          scrollBehavior: "smooth",
          overflowX: "hidden",
        }}
      >
        <NoZoom />
        <Intro />
        <Cursor />
        {children}
      </body>
    </html>
  );
}