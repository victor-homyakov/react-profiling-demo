import { SpeakerHint } from "../components/SpeakerHint";
import { UnstablePropsDemo } from "../demos/UnstablePropsDemo";

export function DevToolsPage() {
    return (
        <div>
            <h1>2. React DevTools</h1>
            <p>Профилирование рендеров и мемоизации. Влияние мемоизации на производительность.</p>

            <UnstablePropsDemo />

            <SpeakerHint>
                В React DevTools Profiler в настройках General включи «Highlight updates when components render», в
                настройках Profiler включи «Record why each component rendered while profiling» и посмотри причины
                рендера. Счётчики рендеров на странице покажут количество рендеров каждого компонента. Для проверки
                качества мемоизации подключи WDYR и посмотри вывод в консоль.
            </SpeakerHint>
        </div>
    );
}
