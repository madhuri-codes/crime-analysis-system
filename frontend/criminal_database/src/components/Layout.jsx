import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, user, onLogout }) {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh" }}>
      <Sidebar />
      <Header user={user} onLogout={onLogout} />
      <main style={{
        marginLeft: 260,
        marginTop: 64,
        marginBottom: 40,
        padding: "32px",
        minHeight: "calc(100vh - 104px)"
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}