import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BuildModeIndicator } from "./components/BuildModeIndicator";
import { Layout } from "./components/Layout";
import { StrictModeProvider, useStrictModeContext } from "./contexts/StrictModeContext";
import { BuildsPage } from "./pages/BuildsPage";
import { DevToolsPage } from "./pages/DevToolsPage";
import { HomePage } from "./pages/HomePage";
import { INPPage } from "./pages/INPPage";
import { MemoryPage } from "./pages/MemoryPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProfilerPage } from "./pages/ProfilerPage";
import { TransitionPage } from "./pages/TransitionPage";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<BuildsPage />} path="/builds" />
            <Route element={<DevToolsPage />} path="/devtools" />
            <Route element={<ProfilerPage />} path="/profiler" />
            <Route element={<PerformancePage />} path="/performance" />
            <Route element={<TransitionPage />} path="/transition" />
            <Route element={<INPPage />} path="/inp" />
            <Route element={<MemoryPage />} path="/memory" />
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
        <StrictModeProvider defaultStrict>
            <AppContent />
        </StrictModeProvider>
    );
}
