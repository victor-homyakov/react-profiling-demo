import { SpeakerHint } from "../components/SpeakerHint";

export function TransitionPage() {
    return (
        <div>
            <h1>5. useTransition</h1>
            <p>Фильтр с/без transition, медленный vs частые рендеры, UI starvation.</p>
            <SpeakerHint>
                Здесь будет демо фильтра с useTransition и без; в докладе: открой React Profiler → Record → быстро вводи
                текст в поле с transition и без → сравни прерванные рендеры и отзывчивость UI.
            </SpeakerHint>
        </div>
    );
}
