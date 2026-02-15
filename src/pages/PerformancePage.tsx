import { SpeakerHint } from "../components/SpeakerHint";
import { LightOrHeavyRenderScenario } from "../demos/LightHeavyRenderDemo";

export function PerformancePage() {
    return (
        <div>
            <h1>4. DevTools Performance</h1>

            <LightOrHeavyRenderScenario isHeavy={true} />

            <SpeakerHint>
                <ol>
                    <li>Открой Chrome DevTools → вкладка Performance.</li>
                    <li>
                        Нажми Record, затем на странице нажми «Перемешать список» или «Выбрать следующий» один или
                        несколько раз.
                    </li>
                    <li>Останови запись. В профиле виден тяжёлый рендер.</li>
                    <li>
                        Переключатель Strict Mode в шапке приложения: при включённом Strict Mode в development React
                        дважды вызывает рендер — в профиле будет виден «renderWithHooksAgain». Отключи Strict Mode и
                        повтори профилирование для сравнения.
                    </li>
                </ol>
            </SpeakerHint>
        </div>
    );
}
