export const metadata = {
  title: "FBN.dev | Felina Beatrice",
  description: "PERN Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#05050f",
          color: "#e2e8f0",
          fontFamily: "'Segoe UI', sans-serif",
          scrollBehavior: "smooth",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}