import { SpeakerHint } from "../components/SpeakerHint";

export function PerformancePage() {
    return (
        <div>
            <h1>4. DevTools Performance</h1>
            <p>Тяжёлый сценарий, Strict Mode.</p>
            <SpeakerHint>
                Здесь будет демо тяжёлого сценария; в докладе: открой DevTools Performance → Record → выполни действие
                на странице → останови запись и посмотри Scripting, обрати внимание на двойной вызов при Strict Mode.
            </SpeakerHint>
        </div>
    );
}
