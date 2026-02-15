import { Profiler as ReactProfiler, useRef, useState } from "react";
import { Profiler as NativeProfiler } from "../profiler/profiler";

/** Искусственная задержка в рендере (для «тяжёлого» сценария) */
function burnCPU(ms: number): void {
    const end = performance.now() + ms;
    while (performance.now() < end) {
        // busy loop
    }
}

const LIGHT_ITEMS = ["Яблоко", "Банан", "Вишня", "Дыня", "Ежевика", "Инжир"];

function shuffleArray<T>(array: T[]): T[] {
    const length = array.length;
    if (length === 0) {
        return [];
    }

    const result = [...array];
    let index = length;

    while (index) {
        const random = Math.floor(Math.random() * index);
        index--;
        const temp = result[index]!;
        result[index] = result[random]!;
        result[random] = temp;
    }

    return result;
}

type ProfilerCommit = {
    id: string;
    phase: "mount" | "update" | "nested-update";
    actualDuration: number;
    baseDuration: number;
    startTime: number;
    commitTime: number;
};

export const HEAVY_MS = 50;

/**
 * Лёгкий или тяжёлый рендер: искусственная задержка в рендере.
 * Экспортируется для страницы демо DevTools Performance.
 */
export function LightOrHeavyRenderScenario({ isHeavy }: { isHeavy: boolean }) {
    const [items, setItems] = useState(() => [...LIGHT_ITEMS]);
    const [selected, setSelected] = useState<string>(LIGHT_ITEMS[0]);

    if (isHeavy) {
        burnCPU(HEAVY_MS);
    }

    const shuffle = () => {
        setItems((prev) => shuffleArray(prev));
    };

    const selectNext = () => {
        setSelected((prev) => {
            const idx = items.indexOf(prev);
            const next = (idx + 1) % items.length;
            return items[next];
        });
    };

    return (
        <div style={blockStyle}>
            <p style={pStyle}>{isHeavy ? "Тяжёлый рендер" : "Лёгкий рендер"}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <button type="button" onClick={shuffle} style={buttonStyle}>
                    Перемешать список
                </button>
                <button type="button" onClick={selectNext} style={buttonStyle}>
                    Выбрать следующий
                </button>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.map((item) => (
                    <ListItem key={item} item={item} isSelected={item === selected} isHeavy={isHeavy} />
                ))}
            </ul>
        </div>
    );
}

const itemStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    marginTop: 4,
    padding: "8px 12px",
};

function ListItem({ item, isSelected, isHeavy }: { item: string; isSelected: boolean; isHeavy?: boolean }) {
    if (isHeavy) {
        burnCPU(HEAVY_MS);
    }

    return (
        <li
            style={{
                ...itemStyle,
                background: isSelected ? "#dbeafe" : "#f8fafc",
            }}
        >
            {item}
        </li>
    );
}

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

type Summary = {
    commitCount: number;
    totalActualMs: number;
    totalBaseMs: number;
};

function summarize(commits: ProfilerCommit[]): Summary {
    return {
        commitCount: commits.length,
        totalActualMs: Math.round(commits.reduce((s, c) => s + c.actualDuration, 0) * 10) / 10,
        totalBaseMs: Math.round(commits.reduce((s, c) => s + c.baseDuration, 0) * 10) / 10,
    };
}

export function LightHeavyRenderDemo() {
    const [isHeavy, setIsHeavy] = useState(false);
    const [profilerRecording, setProfilerRecording] = useState(false);
    const [selfProfilingRecording, setSelfProfilingRecording] = useState(false);
    const [profilerSummary, setProfilerSummary] = useState<Summary | null>(null);
    const profilerCommitsRef = useRef<ProfilerCommit[]>([]);
    const nativeProfiler = useRef<NativeProfiler | null>(null);

    function handleRender(
        id: string,
        phase: "mount" | "update" | "nested-update",
        actualDuration: number,
        baseDuration: number,
        startTime: number,
        commitTime: number,
    ) {
        const entry: ProfilerCommit = {
            id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime,
        };
        if (profilerRecording) {
            profilerCommitsRef.current.push(entry);
        }
    }

    function startProfiler() {
        profilerCommitsRef.current = [];
        setProfilerSummary(null);
        setProfilerRecording(true);
    }

    function stopProfiler() {
        setProfilerRecording(false);
        const commits = profilerCommitsRef.current;
        const sum = summarize(commits);
        setProfilerSummary(sum);
        console.log("[React Profiler] Сводка:", sum, "Коммиты:", commits);
        console.table(commits);
    }

    function startSelfProfiling() {
        nativeProfiler.current = new NativeProfiler();
        nativeProfiler.current.start();
        setSelfProfilingRecording(true);
    }

    function stopSelfProfilingAndDownload() {
        const profile = nativeProfiler.current?.stop();
        setSelfProfilingRecording(false);

        profile
            ?.then((profile) => {
                console.log("[Native Profiler] Профиль:", profile);
                if (!profile) {
                    return;
                }

                const blob = new Blob([profile], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `native-profiler-${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("[Native Profiler] Ошибка:", error);
            });
    }

    return (
        <div style={{ marginTop: 16 }}>
            <section style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>Режим рендера</h3>
                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        type="button"
                        onClick={() => setIsHeavy(false)}
                        style={{ ...buttonStyle, background: !isHeavy ? "#dbeafe" : undefined }}
                    >
                        Лёгкий рендер
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsHeavy(true)}
                        style={{ ...buttonStyle, background: isHeavy ? "#dbeafe" : undefined }}
                    >
                        Тяжёлый рендер
                    </button>
                </div>
            </section>

            <section style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>Profiler (сводка на странице)</h3>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <button type="button" onClick={startProfiler} disabled={profilerRecording} style={buttonStyle}>
                        Старт Profiler
                    </button>
                    <button type="button" onClick={stopProfiler} disabled={!profilerRecording} style={buttonStyle}>
                        Стоп
                    </button>
                    {profilerRecording && <span style={{ color: "#dc2626", fontWeight: 500 }}>Идёт запись…</span>}
                </div>
                {profilerSummary && (
                    <pre
                        style={{
                            background: "#f1f5f9",
                            borderRadius: 6,
                            fontSize: "0.85em",
                            marginTop: 12,
                            overflow: "auto",
                            padding: 12,
                        }}
                    >
                        {JSON.stringify(profilerSummary, null, 2)}
                    </pre>
                )}
            </section>

            <section style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>Self-profiling (экспорт в JSON)</h3>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <button
                        type="button"
                        onClick={startSelfProfiling}
                        disabled={selfProfilingRecording}
                        style={buttonStyle}
                    >
                        Старт Self-profiling
                    </button>
                    <button
                        type="button"
                        onClick={stopSelfProfilingAndDownload}
                        disabled={!selfProfilingRecording}
                        style={buttonStyle}
                    >
                        Стоп и скачать
                    </button>
                    {selfProfilingRecording && <span style={{ color: "#dc2626", fontWeight: 500 }}>Идёт запись…</span>}
                </div>
            </section>

            <section>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>Контент (обёрнут в &lt;Profiler&gt;)</h3>
                <ReactProfiler id={isHeavy ? "heavy" : "light"} onRender={handleRender}>
                    <LightOrHeavyRenderScenario isHeavy={isHeavy} />
                </ReactProfiler>
            </section>
        </div>
    );
}
