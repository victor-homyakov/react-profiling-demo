import { useRef } from "react";

/**
 * Returns the current render count for this component.
 * Increments on every render (including the first).
 */
export function useRenderCount(): number {
    const countRef = useRef(0);
    countRef.current += 1;
    return countRef.current;
}
