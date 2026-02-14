import { SpeakerHint } from "../components/SpeakerHint";

export function DevToolsPage() {
    return (
        <div>
            <h1>2. React DevTools</h1>
            <p>Причины рендера, мемоизация, нестабильные пропсы.</p>
            <SpeakerHint>
                Здесь будет демо причин рендера и мемоизации; в докладе: открой React DevTools → включи «Highlight
                updates» → смотри, какие компоненты ререндерятся и почему.
            </SpeakerHint>
        </div>
    );
}
