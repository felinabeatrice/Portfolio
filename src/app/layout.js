import { Manrope, Bitcount_Single } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const bitcount = Bitcount_Single({
  subsets: ["latin"],
  variable: "--font-bitcount",
  display: "swap",
});

export const metadata = {
  title: "FBN.dev | Felina Beatrice",
  description: "PERN Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${bitcount.variable}`}>
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
        {children}
      </body>
    </html>
  );
}