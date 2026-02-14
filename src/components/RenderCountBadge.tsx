import { useRenderCount } from "../hooks/useRenderCount";

export function RenderCountBadge({ label }: { label?: string }) {
    const count = useRenderCount();

    return (
        <span
            style={{
                background: "#e0e7ff",
                borderRadius: 4,
                color: "#3730a3",
                display: "inline-block",
                marginLeft: 8,
                padding: "2px 8px",
            }}
            title="Количество рендеров"
        >
            {label ? `${label}: ` : ""}рендеров: {count}
        </span>
    );
}
