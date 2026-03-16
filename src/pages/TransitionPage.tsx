import { SpeakerHint } from "../components/SpeakerHint";
import { FilterTransitionDemo } from "../demos/FilterTransitionDemo";

export function TransitionPage() {
    return (
        <div>
            <h1>5. useTransition</h1>
            <p>Отзывчивый ввод и прерванные рендеры в Profiler.</p>

            <FilterTransitionDemo />

            <SpeakerHint>
                В React Profiler включи запись, затем быстро вводи текст в поле фильтра. В варианте A — долгие рендеры,
                ввод лагает. В варианте B — много коротких (прерванных) рендеров, ввод более отзывчивый. В strict mode
                длительность долгого рендера увеличивается в 2 раза (100 мс → 200 мс).
            </SpeakerHint>
        </div>
    );
}
