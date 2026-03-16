import { SpeakerHint } from "../components/SpeakerHint";
import { MemoryDemo } from "../demos/MemoryDemo";

export function MemoryPage() {
    const olStyle: React.CSSProperties = { margin: "0 0 12px", paddingLeft: 20, lineHeight: 1.6 };

    return (
        <div>
            <h1>7. Память и утечки</h1>
            <p>queryObjects, Performance monitor, Detached DOM, Allocations on timeline, три снапшота, useMemo.</p>

            <MemoryDemo />

            <SpeakerHint>
                <p style={{ margin: "0 0 8px" }}>
                    Для поиска утечек лучше открыть вкладку без браузерных расширений (инкогнито). Деятельность вкладки
                    Performance по измерению web vitals видна на таймлайне и в дампах памяти. React DevTools добавляет
                    много шума. Другие расширения могут инжектировать скрипты в страницу, что тоже усложняет анализ.
                </p>
                <p style={{ margin: "0 0 8px" }}>
                    <strong>Диагностика (есть утечка или нет):</strong> queryObjects, Performance monitor, Detached DOM.
                </p>
                <p style={{ margin: "0 0 8px" }}>
                    <strong>Поиск механизма утечки:</strong> Allocations, три снапшота.
                </p>

                <h4>Диагностика — queryObjects</h4>
                <ol style={olStyle}>
                    <li>Chrome DevTools → Console.</li>
                    <li>
                        Выполни <code>queryObjects(LeakyModalContent)</code> — запомни количество.
                    </li>
                    <li>Открой и закрой модалку несколько раз.</li>
                    <li>
                        Снова <code>queryObjects(LeakyModalContent)</code> — экземпляров стало больше.
                    </li>
                    <li>
                        Также попробуй <code>queryObjects(HTMLDivElement)</code> до и после.
                    </li>
                </ol>

                <h4>Диагностика — Performance monitor</h4>
                <ol style={olStyle}>
                    <li>Chrome DevTools → Ctrl+Shift+P → «Show Performance monitor».</li>
                    <li>Обрати внимание на DOM Nodes, JS event listeners.</li>
                    <li>Открой/закрой модалку 10-20 раз.</li>
                    <li>Chrome DevTools → Memory → Collect garbage.</li>
                    <li>
                        Наблюдай рост JS event listeners и DOM nodes — после сборки мусора они не возвращаются к
                        исходному значению.
                    </li>
                </ol>

                <h4>Диагностика/Поиск — Detached DOM</h4>
                <ol style={olStyle}>
                    <li>Открой и закрой модалку.</li>
                    <li>Memory → Detached Elements.</li>
                    <li>Memory → Heap snapshot.</li>
                    <li>
                        В фильтре введи «Detached» — найди <code>Detached HTMLDivElement</code>.
                    </li>
                    <li>
                        Посмотри Retainers — цепочка удержания через <code>LeakyModalContent → domNode</code>.
                    </li>
                </ol>

                <h4>Поиск — Allocations on timeline</h4>
                <ol style={olStyle}>
                    <li>Memory → Allocations on timeline → Start.</li>
                    <li>Открой/закрой модалку 5-10 раз.</li>
                    <li>Останови запись.</li>
                    <li>На таймлайне синие столбики — аллокации, оставшиеся в памяти, в том числе утечки.</li>
                </ol>

                <h4>Поиск — Техника трёх снапшотов</h4>
                <ol style={olStyle}>
                    <li>Открой/закрой модалку 1 раз (прогрев) → Snapshot 1.</li>
                    <li>Открой/закрой модалку 5 раз → Snapshot 2.</li>
                    <li>Открой/закрой модалку ещё 1-2 раза → Snapshot 3.</li>
                    <li>
                        В Snapshot 3 выбери «Objects allocated between Snapshot 1 and Snapshot 2» — найди{" "}
                        <code>LeakyModalContent</code>. Наиболее подозрительны объекты с количеством, кратным 5
                        (количество действий перед вторым снапшотом).
                    </li>
                </ol>

                <h4>useMemo и кэш</h4>
                <ol style={{ ...olStyle, margin: 0 }}>
                    <li>Memory → Heap snapshot → Take snapshot (Snapshot 1).</li>
                    <li>Открой и закрой модалку (useMemo и селектор займут память).</li>
                    <li>Take snapshot (Snapshot 2).</li>
                    <li>Открой и закрой модалку ещё раз.</li>
                    <li>Take snapshot (Snapshot 3).</li>
                    <li>
                        Посмотри на снапшоты. Использование useMemo и селекторов может усложнить анализ памяти, но это
                        не утечка.
                    </li>
                </ol>

                <h4>Домашнее задание</h4>
                <p style={{ margin: "0 0 8px" }}>
                    В первой модалке есть ещё одна маленькая утечка, не упомянутая в описании модалки. Найди её.
                </p>
            </SpeakerHint>
        </div>
    );
}
