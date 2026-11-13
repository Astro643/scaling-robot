import { css } from "remix/component"
import type { PageMeta } from "../lib/page.ts"
import { inviteHref } from "../lib/site-config.ts"
import { Header, PREFETCH } from "../ui/chrome.tsx"
import { SupportWidget } from "../ui/support-widget.tsx"

export const meta: PageMeta = {
  title: "Controller \u00b7 Agentic infrastructure for Discord",
  description:
    "Agentic infrastructure for Discord. AI agents audit and plan your goals, durable workflows run them, and your bot carries them out.",
  styles: ["/site.css"],
}

const splashStyle = css({
  position: "relative",
  overflow: "hidden",
  minHeight: "calc(100svh - 80px)",
  display: "grid",
  placeItems: "center",
  background: "var(--dark)",
  color: "#ECEBEC",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    top: "56%",
    width: "1400px",
    height: "720px",
    transform: "translateX(-50%)",
    background: "radial-gradient(ellipse at center, rgba(46,255,155,.17), transparent 65%)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    bottom: "110px",
    width: "min(720px, 86vw)",
    height: "1px",
    transform: "translateX(-50%)",
    background: "linear-gradient(90deg, transparent, rgba(46,255,155,.55), transparent)",
    pointerEvents: "none",
  },
  "& .in": {
    position: "relative",
    display: "grid",
    justifyItems: "center",
    textAlign: "center",
    padding: "64px 24px",
  },
  "& h1": {
    margin: 0,
    font: "400 clamp(56px,10vw,124px)/0.98 var(--display)",
    textTransform: "uppercase",
    color: "#F4F3EF",
    textWrap: "balance",
    maxWidth: "920px",
  },
  "& h1 em": { fontStyle: "normal", color: "var(--green)" },
  "& .sub": {
    margin: "26px 0 0",
    color: "#B9B8BC",
    fontSize: "17px",
    lineHeight: 1.6,
    maxWidth: "560px",
    textWrap: "pretty",
  },
  "& .go": {
    marginTop: "36px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    font: "600 13px/1 var(--mono)",
    letterSpacing: ".07em",
    textTransform: "uppercase",
    textDecoration: "none",
    color: "#000",
    background: "var(--green)",
    borderBottom: "4px solid #000",
    borderRadius: "10px",
    padding: "16px 30px 13px",
    boxShadow: "0 14px 40px -12px rgba(46,255,155,.6)",
    transition: "transform .12s ease, box-shadow .12s ease",
  },
  "& .go:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 20px 48px -12px rgba(46,255,155,.75)",
  },
  "& .footline": {
    marginTop: "72px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 26px",
    justifyContent: "center",
    font: "500 11.5px var(--mono)",
    letterSpacing: ".09em",
    textTransform: "uppercase",
  },
  "& .footline a": { color: "#8F8E92", textDecoration: "none" },
  "& .footline a:hover": { color: "var(--green)" },
  "& .in > *": { animation: "rise .6s cubic-bezier(.2,.7,.2,1) backwards" },
  "& .in > :nth-child(2)": { animationDelay: ".07s" },
  "& .in > :nth-child(3)": { animationDelay: ".14s" },
  "& .in > :nth-child(4)": { animationDelay: ".22s" },
  "@media (max-width:760px)": {
    minHeight: "calc(100svh - 68px)",
    "& h1": { font: "400 clamp(44px,13vw,72px)/0.98 var(--display)" },
  },
  "@media (prefers-reduced-motion:reduce)": {
    "& .in > *": { animation: "none" },
  },
})

export function HomePage() {
  return () => (
    <>
      <Header dark />
      <main id="main" mix={splashStyle}>
        <div class="in">
          <h1>
            Give your server <em>agents that do the work.</em>
          </h1>
          <p class="sub">
            State a goal in plain language. Your agent plans it, runs it step by step and reports back — in seconds or
            across hours.
          </p>
          {inviteHref ? (
            <a class="go" href={inviteHref}>Add to Discord</a>
          ) : (
            <a class="go" href="/dashboard" {...PREFETCH}>Open Console</a>
          )}
          <nav class="footline" aria-label="Footer">
            <a href="/dashboard" {...PREFETCH}>Console</a>
            <a href="/docs" {...PREFETCH}>Docs</a>
            <a href="/privacy" {...PREFETCH}>Privacy</a>
            <a href="/terms" {...PREFETCH}>Terms</a>
          </nav>
        </div>
      </main>
      <SupportWidget />
    </>
  )
}
