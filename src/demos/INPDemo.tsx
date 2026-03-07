import { useLayoutEffect, useMemo, useRef, useState } from "react";

const blockStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
};

const pStyle: React.CSSProperties = { margin: "0 0 12px", fontSize: "0.9em", color: "#64748b" };

const buttonStyle: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid #94a3b8",
    background: "#f1f5f9",
    cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 200,
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #94a3b8",
    fontSize: "1em",
};

const BOX_COUNT = 500;

/**
 * Компонент 1: useLayoutEffect + getBoundingClientRect.
 *
 * При нажатии кнопки обновляется state, в useLayoutEffect синхронно измеряется getBoundingClientRect у каждого элемента
 * и записывается итог — это блокирует Painting и повышает INP.
 */
export function LayoutThrashingDemo() {
    const [iteration, setIteration] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const children = container.children;
        let height = 0;
        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect();
            height += rect.height;
            // forced style recalc + layout on each read after a write
            (children[i] as HTMLElement).style.paddingLeft = `${(iteration % 5) + 1}px`;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTotalHeight(Math.round(height));
    }, [iteration]);

    const handleClick = () => setIteration((n) => n + 1);

    return (
        <div style={blockStyle}>
            <p style={pStyle}>
                {BOX_COUNT} элементов. По нажатию кнопки запускается useLayoutEffect, который синхронно читает
                getBoundingClientRect и меняет стиль каждого элемента (layout thrashing).
            </p>
            <button onClick={handleClick} style={buttonStyle} type="button">
                Перемерить элементы (итерация {iteration})
            </button>
            <span style={{ marginLeft: 12, fontSize: "0.85em", color: "#64748b" }}>
                Суммарная высота: {totalHeight}px
            </span>
            <div
                ref={containerRef}
                style={{
                    marginTop: 12,
                    maxHeight: 200,
                    overflow: "auto",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                }}
            >
                {Array.from({ length: BOX_COUNT }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            padding: "2px 6px",
                            fontSize: "0.8em",
                            borderBottom: "1px solid #f1f5f9",
                            background: i % 2 === 0 ? "#f8fafc" : "#fff",
                        }}
                    >
                        Элемент {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

LayoutThrashingDemo.displayName = "LayoutThrashingDemo";

const HEAVY_INPUT_LIST_SIZE = 5_000;

function generateItems(seed: string): string[] {
    const items: string[] = [];
    for (let i = 0; i < HEAVY_INPUT_LIST_SIZE; i++) {
        items.push(`${seed}-item-${String(i).padStart(5, "0")}-${"x".repeat(50)}`);
    }
    return items;
}

/**
 * Компонент 2: тяжёлый onInput без useTransition.
 *
 * Каждый keystroke запускает тяжёлое вычисление (генерация массива строк + фильтрация) и полный ререндер
 * длинного списка. Субъективно ощущается лаг при вводе, INP растёт.
 */
export function HeavyInputDemo() {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState<string[]>(() => generateItems(""));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        const generated = generateItems(value);
        const lower = value.toLowerCase().trim();
        const filtered = lower ? generated.filter((s) => s.toLowerCase().includes(lower)) : generated;
        setItems(filtered);
    };

    return (
        <div style={blockStyle}>
            <p style={pStyle}>
                При каждом нажатии клавиши заново генерируется {HEAVY_INPUT_LIST_SIZE} элементов, фильтруется список и
                ререндерится DOM.
            </p>
            <input
                aria-label="Ввод для тяжёлого фильтра"
                onChange={handleChange}
                placeholder="Начните вводить…"
                style={inputStyle}
                type="text"
                value={query}
            />
            <p style={{ ...pStyle, marginTop: 8 }}>Элементов: {items.length}</p>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "8px 0 0",
                    maxHeight: 200,
                    overflow: "auto",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                }}
            >
                {items.map((item, i) => (
                    <li
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        style={{
                            padding: "2px 8px",
                            fontSize: "0.8em",
                            borderBottom: "1px solid #f1f5f9",
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

HeavyInputDemo.displayName = "HeavyInputDemo";

const LONG_LIST_SIZE = 20_000;
const LONG_LIST_ITEMS = Array.from({ length: LONG_LIST_SIZE }, (_, i) => `Item ${String(i + 1).padStart(5, "0")}`);

/**
 * Компонент 3: длинный список с изменением ширины контейнера.
 *
 * Кнопка меняет ширину контейнера, что вызывает reflow всех элементов — долгий Layout в Performance,
 * хотя React-рендер минимален (DOM не меняется, только inline-стиль контейнера).
 */
export function LongListResizeDemo() {
    const [width, setWidth] = useState(600);

    const MIN_WIDTH = 200;
    const MAX_WIDTH = 1000;
    const setRandomWidth = () => setWidth(() => Math.round(Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH));

    const list = useMemo(
        () => (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {LONG_LIST_ITEMS.map((item) => (
                    <li
                        key={item}
                        style={{
                            padding: "2px 8px",
                            fontSize: "0.8em",
                            borderBottom: "1px solid #f1f5f9",
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        ),
        [],
    );

    return (
        <div style={blockStyle}>
            <p style={pStyle}>Список из {LONG_LIST_SIZE} элементов. Кнопка меняет ширину контейнера.</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                <button onClick={setRandomWidth} style={buttonStyle} type="button">
                    Изменить ширину
                </button>
                <span style={{ fontSize: "0.85em", color: "#64748b" }}>Ширина: {width}px</span>
            </div>
            <div
                style={{
                    width,
                    maxHeight: 320,
                    overflow: "auto",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                    transition: "none",
                }}
            >
                {list}
            </div>
        </div>
    );
}

LongListResizeDemo.displayName = "LongListResizeDemo";

const tabStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "6px 6px 0 0",
    border: "1px solid #e2e8f0",
    borderBottom: "none",
    background: "#f8fafc",
    cursor: "pointer",
    fontSize: "0.95em",
};

const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    background: "#fff",
    fontWeight: 600,
    borderBottomColor: "#fff",
};

type DemoTab = "layout-thrashing" | "heavy-input" | "long-list-resize";

const tabs: { id: DemoTab; label: string }[] = [
    { id: "layout-thrashing", label: "Layout thrashing" },
    { id: "heavy-input", label: "Тяжёлый onInput" },
    { id: "long-list-resize", label: "Длинный список" },
];

export function INPDemo() {
    const [activeTab, setActiveTab] = useState<DemoTab>("layout-thrashing");

    return (
        <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #e2e8f0" }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={activeTab === tab.id ? activeTabStyle : tabStyle}
                        type="button"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab === "layout-thrashing" && <LayoutThrashingDemo />}
            {activeTab === "heavy-input" && <HeavyInputDemo />}
            {activeTab === "long-list-resize" && <LongListResizeDemo />}
        </div>
    );
}
