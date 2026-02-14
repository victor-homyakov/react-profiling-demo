import { SpeakerHint } from "../components/SpeakerHint";

export function ProfilerPage() {
    return (
        <div>
            <h1>3. React Profiler</h1>
            <p>Лёгкий/тяжёлый рендер, Self-profiling.</p>
            <SpeakerHint>
                Здесь будет демо лёгкого и тяжёлого рендера; в докладе: открой React Profiler → Record → нажми кнопку
                «Лёгкий» или «Тяжёлый» → посмотри флеймграф и длительность commit.
            </SpeakerHint>
        </div>
    );
}
