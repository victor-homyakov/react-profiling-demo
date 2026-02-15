import { SpeakerHint } from "../components/SpeakerHint";
import { LightHeavyRenderDemo } from "../demos/LightHeavyRenderDemo";

export function ProfilerPage() {
    return (
        <div>
            <h1>3. React Profiler и Self-profiling API</h1>
            <p>Лёгкий и тяжёлый рендер, сбор данных в продакшене.</p>

            <LightHeavyRenderDemo />

            <SpeakerHint>
                <ol>
                    <li>
                        Выбери «Лёгкий рендер» или «Тяжёлый рендер», нажимай кнопки в блоке — в тяжёлом режиме в профиле
                        виден долгий commit.
                    </li>
                    <li>«Старт Profiler» / «Стоп» — запись коммитов в приложении, сводка на странице и в консоли.</li>
                    <li>
                        «Старт Self-profiling» / «Стоп и скачать» — то же + экспорт профиля в JSON и скачивание файла.
                    </li>
                    <li>
                        В React DevTools: вкладка Profiler → Record → выполни действия → останови запись и посмотри
                        флеймграф и длительность commit.
                    </li>
                    <li>
                        Профилирование в production-подобном билде:{" "}
                        <code>npm run build:profiling && npm run preview:profiling</code>.
                    </li>
                </ol>
            </SpeakerHint>
        </div>
    );
}
