import { useMemo, useState, useTransition } from "react";

const LIST_SIZE = 20_000;
const ALL_ITEMS = Array.from({ length: LIST_SIZE }, (_, i) => `Item ${String(i + 1).padStart(5, "0")}`);

const blockStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
};

const pStyle: React.CSSProperties = { margin: "0 0 12px", fontSize: "0.9em", color: "#64748b" };

const inputStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 200,
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #94a3b8",
    fontSize: "1em",
};

const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: "12px 0 0",
    maxHeight: 300,
    overflow: "auto",
};

const itemStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 4,
    marginTop: 2,
    padding: "4px 8px",
    fontSize: "0.9em",
};

function forceDelay(ms: number) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // do nothing
    }
}

function filterItems(items: string[], filter: string): string[] {
    forceDelay(100);
    if (!filter.trim()) return items;
    const lower = filter.toLowerCase().trim();
    return items.filter((item) => item.toLowerCase().includes(lower));
}

/** Вариант A: без startTransition — при быстром вводе один длинный блокирующий рендер. */
function FilterBlocking() {
    const [filter, setFilter] = useState("");
    const filtered = useMemo(() => filterItems(ALL_ITEMS, filter), [filter]);

    return (
        <div style={blockStyle}>
            <p style={pStyle}>список фильтруется и обновляется при каждом onChange</p>
            <input
                aria-label="Фильтр списка (без transition)"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Фильтр по списку"
                style={inputStyle}
                type="text"
                value={filter}
            />
            <ul style={listStyle}>
                {filtered.map((item) => (
                    <li key={item} style={itemStyle}>
                        {item}
                    </li>
                ))}
            </ul>
            <p style={{ ...pStyle, marginTop: 8 }}>
                Найдено: {filtered.length} из {LIST_SIZE}
            </p>
        </div>
    );
}

FilterBlocking.displayName = "FilterBlocking";

/** Вариант B: с startTransition — отзывчивый ввод, в Profiler много коротких/прерванных работ. */
function FilterWithTransition() {
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("");
    const [isPending, startTransition] = useTransition();
    const filtered = useMemo(() => filterItems(ALL_ITEMS, filter), [filter]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        startTransition(() => {
            setFilter(value);
        });
    };

    return (
        <div style={blockStyle}>
            <p style={pStyle}>список фильтруется в startTransition</p>
            <input
                aria-label="Фильтр списка (с transition)"
                onChange={handleChange}
                placeholder="Фильтр по списку"
                style={inputStyle}
                type="text"
                value={inputValue}
            />
            <span style={{ marginLeft: 8, fontSize: "0.85em", color: "#64748b" }}>{isPending ? "⏳" : "✅"}</span>
            <ul style={listStyle}>
                {filtered.map((item) => (
                    <li key={item} style={itemStyle}>
                        {item}
                    </li>
                ))}
            </ul>
            <p style={{ ...pStyle, marginTop: 8 }}>
                Найдено: {filtered.length} из {LIST_SIZE}
            </p>
        </div>
    );
}

FilterWithTransition.displayName = "FilterWithTransition";

const radioGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: 16,
    alignItems: "center",
    marginBottom: 16,
};

const radioLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
};

export function FilterTransitionDemo() {
    const [variant, setVariant] = useState<"blocking" | "transition">("blocking");

    return (
        <div style={{ marginTop: 16 }}>
            <section style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>Фильтр списка</h3>
                <div aria-label="Выбор варианта фильтра" role="radiogroup" style={radioGroupStyle}>
                    <label style={radioLabelStyle}>
                        <input
                            checked={variant === "blocking"}
                            name="filter-variant"
                            onChange={() => setVariant("blocking")}
                            type="radio"
                            value="blocking"
                        />{" "}
                        Вариант A — без useTransition
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            checked={variant === "transition"}
                            name="filter-variant"
                            onChange={() => setVariant("transition")}
                            type="radio"
                            value="transition"
                        />{" "}
                        Вариант B — с useTransition
                    </label>
                </div>
                {variant === "blocking" ? <FilterBlocking /> : <FilterWithTransition />}
            </section>
        </div>
    );
}
