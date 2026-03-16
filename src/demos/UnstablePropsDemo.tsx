import React, { memo, useMemo, useState } from "react";
import { RenderCountBadge } from "../components/RenderCountBadge";

const ITEMS = ["Яблоко", "Банан", "Вишня", "Дыня", "Ежевика"];

function pickRandom<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function ListItem({ style, data }: { style: React.CSSProperties; data: readonly string[] }) {
    return (
        <div style={{ ...itemStyle, ...style }}>
            <RenderCountBadge label={`items: ${data.length}`} />
        </div>
    );
}

const ListItemMemo = memo(ListItem);

const itemStyle: React.CSSProperties = {
    borderRadius: 6,
    fontSize: "0.8em",
    marginTop: 4,
};

function NoMemoList() {
    const [selected, setSelected] = useState<string>(ITEMS[0]);
    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>Без memo</h3>
            <p style={pStyle}>новые объекты при каждом рендере</p>
            <button onClick={() => setSelected(pickRandom(ITEMS))} style={randomButtonStyle} type="button">
                Случайный элемент
            </button>
            {ITEMS.map((item) => (
                <ListItem data={[...ITEMS]} key={item} style={{ margin: "5px 0" }} />
            ))}
            <p style={{ marginTop: 8 }}>Выбрано: {selected}</p>
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
            <button onClick={() => setSelected(pickRandom(ITEMS))} style={randomButtonStyle} type="button">
                Случайный элемент
            </button>
            {ITEMS.map((item) => (
                <ListItemMemo data={[...ITEMS]} key={item} style={{ margin: "5px 0" }} />
            ))}
            <p style={{ marginTop: 8 }}>Выбрано: {selected}</p>
        </div>
    );
}

/**
 * Хорошие пропсы: стабильные ссылки — memo сокращает ререндеры
 */
function GoodPropsList() {
    const [selected, setSelected] = useState<string>(ITEMS[0]);
    const stableStyle = useMemo(() => ({ margin: "5px 0" }), []);
    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>С memo</h3>
            <p style={pStyle}>стабильные ссылки при каждом рендере</p>
            <button onClick={() => setSelected(pickRandom(ITEMS))} style={randomButtonStyle} type="button">
                Случайный элемент
            </button>
            {ITEMS.map((item) => (
                <ListItemMemo data={ITEMS} key={item} style={stableStyle} />
            ))}
            <p style={{ marginTop: 8 }}>Выбрано: {selected}</p>
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
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <NoMemoList />
                <BadPropsList />
                <GoodPropsList />
            </div>
        </section>
    );
}
