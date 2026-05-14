"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogNavbar from "./BlogNavbar";
import BlogFooter from "./BlogFooter";
import BlogProgressBar from "./BlogProgressBar";
import BlogTableOfContents from "./BlogTableOfContents";

export default function BlogPostLayout({ blog }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <BlogProgressBar />
      <BlogNavbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#271a38",
          padding: isMobile
            ? "90px 24px 60px"
            : "100px 40px 80px",
          boxSizing: "border-box",
          fontFamily: "var(--font-manrope), sans-serif",
          color: "#76dbdb",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "fixed",
            width: "600px",
            height: "600px",
            background: `radial-gradient(circle, ${blog.glowColor} 0%, transparent 70%)`,
            ...blog.glowPosition,
            pointerEvents: "none",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: blog.title, href: null },
            ].map((crumb, i, arr) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    style={{
                      textDecoration: "none",
                      fontSize: "12px",
                      color: "rgba(118,219,219,0.4)",
                      letterSpacing: "0.5px",
                      fontWeight: 600,
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#76dbdb")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color =
                        "rgba(118,219,219,0.4)")
                    }
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(118,219,219,0.6)",
                      letterSpacing: "0.5px",
                      fontWeight: 600,
                      maxWidth: isMobile ? "200px" : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: isMobile ? "nowrap" : "normal",
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "rgba(118,219,219,0.2)",
                    }}
                  >
                    /
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Header — max width 720 */}
          <div style={{ maxWidth: "720px", marginBottom: "40px" }}>
            <p
              style={{
                color: "#f75082",
                letterSpacing: "3px",
                fontSize: "11px",
                textTransform: "uppercase",
                fontWeight: 700,
                margin: "0 0 16px 0",
              }}
            >
              Developer Notes
            </p>

            <h1
              style={{
                fontSize: isMobile
                  ? "clamp(26px, 8vw, 38px)"
                  : "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                color: "#76dbdb",
                letterSpacing: "2px",
                lineHeight: 1.2,
                margin: "0 0 20px 0",
                fontFamily: "var(--font-bitcount), monospace",
              }}
            >
              {blog.title}
            </h1>

            <p
              style={{
                color: "rgba(118,219,219,0.6)",
                fontSize: "16px",
                lineHeight: 1.7,
                margin: "0 0 28px 0",
              }}
            >
              {blog.description}
            </p>

            {/* Author card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 20px",
                borderRadius: "12px",
                background: "rgba(118,219,219,0.04)",
                border: "1px solid rgba(118,219,219,0.12)",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(247,80,130,0.3), rgba(118,219,219,0.2))",
                  border: "1px solid rgba(247,80,130,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#76dbdb",
                  fontFamily: "monospace",
                }}
              >
                F
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#76dbdb",
                    letterSpacing: "0.5px",
                  }}
                >
                  {blog.author}
                </p>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "12px",
                    color: "rgba(118,219,219,0.45)",
                  }}
                >
                  {blog.role}
                </p>
              </div>

              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(118,219,219,0.4)",
                  }}
                >
                  {blog.date}
                </span>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(118,219,219,0.2)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#f75082",
                    fontWeight: 700,
                  }}
                >
                  {blog.readingTime}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "60px",
                height: "2px",
                background:
                  "linear-gradient(90deg, #f75082, transparent)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Hero image */}
          <div
            style={{
              width: "100%",
              maxWidth: "720px",
              height: isMobile ? "200px" : "380px",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "56px",
              border: "1px solid rgba(118,219,219,0.12)",
              boxShadow:
                "0 8px 40px rgba(118,219,219,0.06)",
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Content + TOC */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              alignItems: "flex-start",
            }}
          >
            {/* Article */}
            <article
              style={{
                flex: 1,
                minWidth: 0,
                maxWidth: "720px",
              }}
            >
              {blog.sections.map(({ id, heading, paragraphs, code }) => (
                <section
                  key={id}
                  id={id}
                  style={{ marginBottom: "52px" }}
                >
                  <h2
                    style={{
                      fontSize: isMobile ? "19px" : "22px",
                      fontWeight: 700,
                      color: "#76dbdb",
                      letterSpacing: "0.3px",
                      margin: "0 0 20px 0",
                      lineHeight: 1.35,
                      fontFamily: "var(--font-manrope), sans-serif",
                    }}
                  >
                    {heading}
                  </h2>

                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      style={{
                        color: "rgba(118,219,219,0.72)",
                        fontSize: isMobile ? "15px" : "16px",
                        lineHeight: 1.9,
                        margin: "0 0 20px 0",
                      }}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Code block — optional per section */}
                  {code && (
                    <div
                      style={{
                        margin: "24px 0",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid rgba(118,219,219,0.12)",
                      }}
                    >
                      {/* Code block header */}
                      <div
                        style={{
                          padding: "10px 16px",
                          background: "rgba(118,219,219,0.06)",
                          borderBottom:
                            "1px solid rgba(118,219,219,0.1)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {["#f75082", "#76dbdb", "rgba(118,219,219,0.3)"].map(
                          (c, i) => (
                            <div
                              key={i}
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: c,
                                opacity: 0.6,
                              }}
                            />
                          )
                        )}
                        {code.filename && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "11px",
                              color: "rgba(118,219,219,0.35)",
                              letterSpacing: "0.5px",
                              fontFamily: "monospace",
                            }}
                          >
                            {code.filename}
                          </span>
                        )}
                      </div>

                      {/* Code content */}
                      <pre
                        style={{
                          margin: 0,
                          padding: "20px 24px",
                          background: "rgba(26,15,40,0.8)",
                          overflowX: "auto",
                          fontSize: isMobile ? "12px" : "13px",
                          lineHeight: 1.7,
                          fontFamily: "monospace",
                          color: "rgba(118,219,219,0.85)",
                        }}
                      >
                        <code>{code.content}</code>
                      </pre>
                    </div>
                  )}
                </section>
              ))}

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "rgba(118,219,219,0.08)",
                  margin: "48px 0",
                }}
              />

              {/* Closing quote */}
              <blockquote
                style={{
                  margin: "0 0 48px 0",
                  padding: "20px 24px",
                  borderLeft: "3px solid #f75082",
                  background: "rgba(247,80,130,0.04)",
                  borderRadius: "0 12px 12px 0",
                }}
              >
                <p
                  style={{
                    color: "rgba(118,219,219,0.6)",
                    fontSize: "15px",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {blog.quote}
                </p>
              </blockquote>

              {/* Back to articles */}
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(118,219,219,0.45)",
                  textDecoration: "none",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  fontWeight: 600,
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "#f75082")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color =
                    "rgba(118,219,219,0.45)")
                }
              >
                ← All Articles
              </Link>
            </article>

            {/* TOC — desktop only */}
            {!isMobile && (
              <BlogTableOfContents sections={blog.sections} />
            )}
          </div>
        </div>
      </main>

      <BlogFooter />
    </>
  );
}