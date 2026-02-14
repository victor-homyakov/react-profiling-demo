import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictModeProvider, useStrictModeContext } from "./contexts/StrictModeContext";
import { BuildModeIndicator } from "./components/BuildModeIndicator";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BuildsPage } from "./pages/BuildsPage";
import { DevToolsPage } from "./pages/DevToolsPage";
import { ProfilerPage } from "./pages/ProfilerPage";
import { PerformancePage } from "./pages/PerformancePage";
import { TransitionPage } from "./pages/TransitionPage";
import { INPPage } from "./pages/INPPage";
import { MemoryPage } from "./pages/MemoryPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/devtools" element={<DevToolsPage />} />
            <Route path="/profiler" element={<ProfilerPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/transition" element={<TransitionPage />} />
            <Route path="/inp" element={<INPPage />} />
            <Route path="/memory" element={<MemoryPage />} />
        </Routes>
    );
}

function AppContent() {
    const { useStrictMode } = useStrictModeContext();

    const content = (
        <BrowserRouter>
            <Layout>
                <BuildModeIndicator />
                <AppRoutes />
            </Layout>
        </BrowserRouter>
    );
    return useStrictMode ? <StrictMode>{content}</StrictMode> : content;
}

export default function App() {
    return (
        <StrictModeProvider defaultStrict={true}>
            <AppContent />
        </StrictModeProvider>
    );
}
