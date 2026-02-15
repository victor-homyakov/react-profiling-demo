import { SpeakerHint } from "../components/SpeakerHint";
import { UnstablePropsDemo } from "../demos/UnstablePropsDemo";

export function DevToolsPage() {
    return (
        <div>
            <h1>2. React DevTools</h1>
            <p>Профилирование рендеров и мемоизации. Влияние мемоизации на производительность.</p>

            <UnstablePropsDemo />

            <SpeakerHint>
                <ol>
                    <li>
                        В React DevTools Profiler в настройках General включи «Highlight updates when components render»
                    </li>
                    <li>В настройках Profiler включи «Record why each component rendered while profiling»</li>
                    <li>Начни запись профиля, понажимай на кнопки</li>
                    <li>Посмотри причины рендера</li>
                    <li>Счётчики рендеров на странице покажут количество рендеров каждого компонента</li>
                    <li>Для проверки качества мемоизации подключи WDYR и посмотри вывод в консоль</li>
                </ol>
            </SpeakerHint>
        </div>
    );
}
