import { memo, useCallback, useMemo, useState } from "react";
import { RenderCountBadge } from "../components/RenderCountBadge";

const ITEMS = ["Яблоко", "Банан", "Вишня", "Дыня", "Ежевика"];

function pickRandom<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function ListItem({
    label,
    onSelect,
    style,
    data,
}: {
    label: string;
    onSelect: (item: string) => void;
    style: React.CSSProperties;
    data: readonly string[];
}) {
    return (
        <div style={{ ...itemStyle, ...style }}>
            {/* <button type="button" onClick={() => onSelect(label)}>
                {label}
            </button> */}
            <span style={{ fontSize: "0.8em", marginLeft: 8 }}>data.length={data.length}</span>
            <RenderCountBadge />
        </div>
    );
}

const ListItemMemo = memo(ListItem);

const itemStyle: React.CSSProperties = {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    fontSize: "0.8em",
    marginTop: 4,
    padding: 8,
};

function NoMemoList() {
    const [selected, setSelected] = useState<string>(ITEMS[0]);
    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>Без memo</h3>
            <p style={pStyle}>новые объекты при каждом рендере</p>
            <button type="button" onClick={() => setSelected(pickRandom(ITEMS))} style={randomButtonStyle}>
                Случайный элемент
            </button>
            {ITEMS.map((item) => (
                <ListItem
                    key={item}
                    label={item}
                    onSelect={(value) => setSelected(value)}
                    style={{ margin: 5 }}
                    data={[...ITEMS]}
                />
            ))}
            {selected && <p style={{ marginTop: 8 }}>Выбрано: {selected}</p>}
        </div>
    );
}

/**
 * Плохие пропсы: новые ссылки при каждом рендере родителя — memo не помогает
 */
function BadPropsList() {
    const [selected, setSelected] = useState<string>(ITEMS[0]);
    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>С memo</h3>
            <p style={pStyle}>новые объекты при каждом рендере</p>
            <button type="button" onClick={() => setSelected(pickRandom(ITEMS))} style={randomButtonStyle}>
                Случайный элемент
            </button>
            {ITEMS.map((item) => (
                <ListItemMemo
                    key={item}
                    label={item}
                    onSelect={(value) => setSelected(value)}
                    style={{ margin: 5 }}
                    data={[...ITEMS]}
                />
            ))}
            {selected && <p style={{ marginTop: 8 }}>Выбрано: {selected}</p>}
        </div>
    );
}

/**
 * Хорошие пропсы: стабильные ссылки — memo сокращает ререндеры
 */
function GoodPropsList() {
    const [selected, setSelected] = useState<string>(ITEMS[0]);
    const onSelect = useCallback((item: string) => {
        setSelected(item);
    }, []);
    const stableStyle = useMemo(() => ({ margin: 5 }), []);
    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>С memo</h3>
            <p style={pStyle}>стабильные ссылки</p>
            <button type="button" onClick={() => setSelected(pickRandom(ITEMS))} style={randomButtonStyle}>
                Случайный элемент
            </button>
            {ITEMS.map((item) => (
                <ListItemMemo key={item} label={item} onSelect={onSelect} style={stableStyle} data={ITEMS} />
            ))}
            {selected && <p style={{ marginTop: 8 }}>Выбрано: {selected}</p>}
        </div>
    );
}

const blockStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    flex: 1,
    minWidth: 0,
    padding: 16,
};

const h3Style: React.CSSProperties = { margin: "0 0 8px", fontSize: "1em" };
const pStyle: React.CSSProperties = { margin: "0 0 8px", fontSize: "0.9em", color: "#64748b" };
const randomButtonStyle: React.CSSProperties = { cursor: "pointer", marginBottom: 12 };

export function UnstablePropsDemo() {
    return (
        <section style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: "1.1em", marginBottom: 8 }}>Нестабильные vs стабильные пропсы</h2>
            <p style={{ color: "#64748b", fontSize: "0.95em", marginBottom: 12 }}>
                Первый список не использует мемоизацию элементов. Второй список используют memo у элементов, но
                нестабильные пропсы. Третий список использует memo у элементов и передаёт стабильные пропсы.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <NoMemoList />
                <BadPropsList />
                <GoodPropsList />
            </div>
        </section>
    );
}
