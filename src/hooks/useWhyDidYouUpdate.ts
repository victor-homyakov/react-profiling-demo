/**
 * Based on https://usehooks.com/useWhyDidYouUpdate/
 */
import { useEffect, useRef } from "react";

type TPropSignature = Record<string, unknown>;

/**
 * Хук, который выводит в консоль пропсы, изменившиеся с предыдущего рендера.
 * Помогает найти **возможно** ненужные рендеры.
 */
export function useWhyDidYouUpdate<P extends TPropSignature>(props: P, logPropsChange?: boolean) {
    const prevPropsRef = useRef<P>(null);
    // const [changedProps, setChangedProps] = useState<TPropSignature>({});

    useEffect(() => {
        const prevProps = prevPropsRef.current;
        prevPropsRef.current = props;
        if (!prevProps) {
            return;
        }

        const allKeys = Object.keys({ ...prevProps, ...props });
        const newChangedProps: TPropSignature = {};
        let hasChangedProps = false;

        allKeys.forEach((key) => {
            const from = prevProps[key];
            const to = props[key];
            if (from !== to) {
                newChangedProps[key] = { from, to };
                hasChangedProps = true;
            }
        });

        if (hasChangedProps) {
            // setChangedProps(newChangedProps);
            if (logPropsChange) {
                console.log("[why-did-you-update]", newChangedProps);
            }
        }
    }, [logPropsChange, props]);

    // return changedProps;
}
