import { SpeakerHint } from "../components/SpeakerHint";

export function INPPage() {
    return (
        <div>
            <h1>6. INP и мемоизация</h1>
            <p>GC/Layout, useMemo-кейсы, WDYR, useWhyDidYouUpdate, частые/долгие ререндеры.</p>
            <SpeakerHint>
                Здесь будет демо INP, GC/Layout и мемоизации; в докладе: открой Performance → смотри INP и фазы после
                Scripting (GC, Layout); подключи WDYR и смотри консоль при нестабильных пропсах.
            </SpeakerHint>
        </div>
    );
}
