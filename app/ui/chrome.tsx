import { css } from "remix/component"
import type { Handle, RemixNode } from "remix/component"

import { hasContact, inviteHref, supportHref, supportMail } from "../lib/site-config.ts"
import { Logo } from "./logo.tsx"
import { SupportWidget } from "./support-widget.tsx"

export const PREFETCH = { "data-rmx-prefetch": "intent" } as const

const headerStyle = css({
  position: "sticky",
  top: 0,
  zIndex: 20,
  background: "rgba(238,237,232,.84)",
  backdropFilter: "saturate(1.2) blur(12px)",
  borderBottom: "1px solid rgba(5,5,5,.06)",
  "& .bar": {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    height: "80px",
  },
  "& .bar > :last-child": { justifySelf: "end" },
  "& .bar .logo": { color: "#000" },
  "& nav a": {
    font: "600 12px var(--mono)",
    letterSpacing: ".07em",
    textTransform: "uppercase",
    textDecoration: "none",
    color: "var(--muted)",
    padding: "10px 12px",
    borderRadius: "7px",
  },
  "& nav a:hover": { color: "var(--ink)", background: "rgba(5,5,5,.06)" },
  "@media (max-width:760px)": {
    "& .bar": { display: "flex", justifyContent: "space-between", gap: "8px", height: "68px" },
  },
})

const footerStyle = css({
  marginTop: "110px",
  background: "var(--dark)",
  color: "#ECEBEC",
  "& .foot": {
    display: "grid",
    gap: "36px",
    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
    padding: "56px 0 40px",
  },
  "& .brand": { color: "#fff" },
  "& .brand .logo": {
    background: "var(--green)",
    color: "#000",
    padding: "5px",
    borderRadius: "7px",
    width: "30px",
    height: "30px",
  },
  "& .about": { color: "#9A999D", fontSize: "14.5px", marginTop: "12px", maxWidth: "290px" },
  "& h4": {
    margin: "0 0 16px",
    font: "600 11.5px var(--mono)",
    color: "#8F8E92",
    letterSpacing: ".09em",
    textTransform: "uppercase",
  },
  "& .links a": { display: "block", textDecoration: "none", color: "#D4D3D5", fontSize: "15px", padding: "4px 0" },
  "& .links a:hover": { color: "var(--green)" },
  "& .legal": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "8px 24px",
    borderTop: "1px solid var(--dark-line)",
    padding: "18px 0 28px",
    color: "#8F8E92",
    font: "500 11.5px var(--mono)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },
  "& :focus-visible": { outlineColor: "#fff" },
  "@media (max-width:760px)": {
    "& .foot": { gridTemplateColumns: "1fr 1fr" },
    "& .foot > :first-child": { gridColumn: "1 / -1" },
  },
})

const headerDarkStyle = css({
  background: "rgba(34,32,34,.72)",
  borderBottom: "1px solid rgba(236,235,236,.08)",
  "& .bar .logo": { color: "#ECEBEC" },
  "& .bar .brand": { color: "#ECEBEC" },
  "& nav a": { color: "#A5A4A8" },
  "& nav a:hover": { color: "#fff", background: "rgba(255,255,255,.08)" },
  "& .bar .btn-primary": {
    background: "transparent",
    color: "var(--green)",
    border: "1px solid rgba(46,255,155,.45)",
    borderBottom: "1px solid rgba(46,255,155,.45)",
    boxShadow: "none",
  },
  "& .bar .btn-primary:hover": { background: "rgba(46,255,155,.1)" },
  "& .bar .btn-primary:active": { transform: "none", paddingBottom: "9px" },
  "& :focus-visible": { outlineColor: "#fff" },
})

export function Header(handle: Handle<{ dark?: boolean }>) {
  return () => (
    <header mix={handle.props?.dark ? [headerStyle, headerDarkStyle] : headerStyle}>
      <div class="wrap bar">
        <a class="brand" href="/" {...PREFETCH}>
          <Logo />
          Controller
        </a>
        <nav aria-label="Main">
          <a href="/docs" {...PREFETCH}>Docs</a>
        </nav>
        <a class="btn btn-primary btn-sm" href="/dashboard" {...PREFETCH}>Open Console</a>
      </div>
    </header>
  )
}

export function Footer() {
  return () => (
    <footer mix={footerStyle}>
      <div class="wrap">
        <div class="foot">
          <div>
            <a class="brand" href="/" {...PREFETCH}>
              <Logo />
              Controller
            </a>
            <p class="about">Agentic infrastructure for Discord. Agents plan it, workflows run it, your bot does it.</p>
          </div>
          <div class="links">
            <h4>Product</h4>
            <a href="/dashboard" {...PREFETCH}>Console</a>
            <a href="/docs" {...PREFETCH}>Docs</a>
            {inviteHref ? <a href={inviteHref}>Add to Discord</a> : null}
          </div>
          {hasContact ? (
            <div class="links">
              <h4>Help</h4>
              {supportHref ? <a href={supportHref}>Discord server</a> : null}
              {supportMail ? <a href={"mailto:" + supportMail}>{supportMail}</a> : null}
            </div>
          ) : null}
          <div class="links">
            <h4>Legal</h4>
            <a href="/privacy" {...PREFETCH}>Privacy Policy</a>
            <a href="/terms" {...PREFETCH}>Terms of Service</a>
          </div>
        </div>
        <div class="legal">
          <span>© {String(new Date().getFullYear())} Controller</span>
          <span>Not affiliated with or endorsed by Discord Inc.</span>
        </div>
      </div>
    </footer>
  )
}

/** Header, main content, footer and support widget, shared by every page except the Console. */
export function Layout(handle: Handle<{ children?: RemixNode }>) {
  return () => (
    <>
      <a class="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <div class="wrap">{handle.props.children}</div>
      </main>
      <Footer />
      <SupportWidget />
    </>
  )
}

export function ContactLine() {
  return () => {
    if (supportMail && supportHref) {
      return (
        <>
          <a href={"mailto:" + supportMail}>{supportMail}</a>
          {" or "}
          <a href={supportHref}>our Discord server</a>
        </>
      )
    }
    if (supportMail) return <a href={"mailto:" + supportMail}>{supportMail}</a>
    if (supportHref) return <a href={supportHref}>our Discord server</a>
    return <span>please contact whoever operates this bot for your server.</span>
  }
}
