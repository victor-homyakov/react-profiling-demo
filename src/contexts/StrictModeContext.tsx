import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type StrictModeContextValue = {
    useStrictMode: boolean;
    setUseStrictMode: (value: boolean) => void;
};

const StrictModeContext = createContext<StrictModeContextValue | null>(null);

export function StrictModeProvider({
    children,
    defaultStrict = true,
}: {
    children: ReactNode;
    defaultStrict?: boolean;
}) {
    const [useStrictMode, setUseStrictMode] = useState(defaultStrict);
    const value = useMemo(() => ({ useStrictMode, setUseStrictMode }), [useStrictMode, setUseStrictMode]);
    return <StrictModeContext.Provider value={value}>{children}</StrictModeContext.Provider>;
}

export function useStrictModeContext() {
    const ctx = useContext(StrictModeContext);
    if (!ctx) throw new Error("useStrictModeContext used outside StrictModeProvider");
    return ctx;
}
