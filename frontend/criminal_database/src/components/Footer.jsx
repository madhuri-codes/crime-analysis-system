export default function Footer() {
  return (
    <footer style={{
      position: "fixed", bottom: 0, left: 260, right: 0, height: 40,
      background: "#080f1e", borderTop: "1px solid #1e293b",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", zIndex: 100
    }}>
      <span style={{
        color: "#334155", fontSize: 11,
        fontFamily: "'IBM Plex Mono', monospace"
      }}>
        © 2026 CrimeBase — NITK CS254 DBMS Project
      </span>
      <span style={{ color: "#334155", fontSize: 11 }}>
        v1.0.0 &nbsp;|&nbsp; MySQL + Express + React
      </span>
    </footer>
  );
}