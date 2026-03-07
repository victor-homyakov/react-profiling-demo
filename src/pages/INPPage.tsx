import { SpeakerHint } from "../components/SpeakerHint";

export function INPPage() {
    return (
        <div>
            <h1>6. INP</h1>
            <p>GC/Layout, useMemo-кейсы, частые/долгие ререндеры.</p>
            <SpeakerHint>
                Здесь будет демо INP, GC/Layout и мемоизации; в докладе: открой Performance → смотри INP и фазы после
                Scripting (GC, Layout).
            </SpeakerHint>
        </div>
    );
}
