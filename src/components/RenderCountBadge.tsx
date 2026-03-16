import { useRenderCount } from "../hooks/useRenderCount";

const spanStyle = {
    background: "#e0e7ff",
    borderRadius: 4,
    color: "#3730a3",
    display: "inline-block",
    padding: "2px 8px",
};

export function RenderCountBadge({ label }: { label?: string }) {
    const count = useRenderCount();

    return (
        <span style={spanStyle} title="Количество рендеров">
            {label ? label + " " : ""}рендеров: {count}
        </span>
    );
}
