import { SpeakerHint } from "../components/SpeakerHint";
import { INPDemo } from "../demos/INPDemo";

export function INPPage() {
    return (
        <div>
            <h1>6. INP</h1>
            <p>
                Компоненты могут рендериться быстро, но INP всё равно окажется высоким. Проблема может быть не в
                Scripting, а в Layout, Paint или GC.
            </p>

            <INPDemo />

            <SpeakerHint>
                <p style={{ margin: 0 }}>
                    Открой Chrome DevTools → Performance → включи запись → выполни действие в каждой вкладке. Обрати
                    внимание:
                </p>
                <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                    <li>
                        <strong>Layout thrashing</strong> — в Performance видно Rendering (Layout и Recalculate Style)
                        внутри синхронного useLayoutEffect. Scripting и Painting может быть коротким, Rendering долгий.
                    </li>
                    <li>
                        <strong>Тяжёлый onInput</strong> — долгий Scripting + Rendering (Layout forced reflow) при
                        частом вводе. В Performance видно, что при нескольких быстрых нажатиях сразу после первого
                        нажатия заблокированы keyboard interactions, их INP дополнительно увеличивается (большой input
                        delay).
                    </li>
                    <li>
                        <strong>Длинный список</strong> — Scripting минимален (React отрабатывает быстро), но долгий
                        Rendering (Layout) и Painting (Paint + Commit). В INP большой presentation delay.
                    </li>
                </ul>
            </SpeakerHint>
        </div>
    );
}
