"use client";


import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          TeraSight is running
        </h1>
        <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
          The frontend dev server is up on localhost:3000.
        </p>
        <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
          Use this temporary entry page while the remaining route-group components are being completed.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/analyze">Open Analyze</Link>
          <Link href="/dashboard">Open Dashboard</Link>
          <Link href="/login">Open Login</Link>
        </div>
      </div>
    </main>
  );
}
