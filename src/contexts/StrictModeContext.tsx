import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

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
    const [useStrictMode, setUseStrictModeState] = useState(defaultStrict);
    const setUseStrictMode = useCallback((value: boolean) => {
        setUseStrictModeState(value);
    }, []);
    return (
        <StrictModeContext.Provider value={{ useStrictMode, setUseStrictMode }}>{children}</StrictModeContext.Provider>
    );
}

export function useStrictModeContext() {
    const ctx = useContext(StrictModeContext);
    if (!ctx) throw new Error("useStrictModeContext used outside StrictModeProvider");
    return ctx;
}
