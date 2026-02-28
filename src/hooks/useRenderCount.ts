import { useRef } from "react";

/**
 * Returns the current render count for this component.
 * Increments on every render (including the first).
 */
export function useRenderCount(): number {
    const countRef = useRef(0);
    // eslint-disable-next-line react-hooks/refs
    countRef.current += 1;
    // eslint-disable-next-line react-hooks/refs
    return countRef.current;
}
