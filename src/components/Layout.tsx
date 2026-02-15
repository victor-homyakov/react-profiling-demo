import { Link } from "react-router-dom";

const nav = [
    { path: "/", label: "Главная" },
    { path: "/builds", label: "1. Сборки и Strict mode" },
    { path: "/devtools", label: "2. React DevTools" },
    { path: "/profiler", label: "3. React Profiler и Self-profiling API" },
    { path: "/performance", label: "4. DevTools Performance" },
    { path: "/transition", label: "5. useTransition" },
    { path: "/inp", label: "6. INP и мемоизация" },
    { path: "/memory", label: "7. Память и утечки" },
] as const;

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside
                style={{
                    background: "#fff",
                    borderRight: "1px solid #e2e8f0",
                    padding: "16px 0",
                    width: 220,
                }}
            >
                <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {nav.map(({ path, label }) => (
                        <Link key={path} to={path} style={linkStyle}>
                            {label}
                        </Link>
                    ))}
                </nav>
            </aside>
            <main style={{ flex: 1, padding: 24, overflow: "auto" }}>{children}</main>
        </div>
    );
}

const linkStyle: React.CSSProperties = { color: "inherit", padding: "8px 16px" };
