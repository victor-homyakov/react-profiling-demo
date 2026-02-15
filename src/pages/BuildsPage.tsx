import { useState } from "react";
import { SpeakerHint } from "../components/SpeakerHint";

let count = 0;

export function BuildsPage() {
    const [x, setX] = useState(0);
    count++;
    console.log("Render BuildsPage", count);

    return (
        <div>
            <h1>1. Сборки и Strict mode</h1>
            <p>Виды сборки react-dom: development, production и profiling.</p>
            <p>Переключатель Strict Mode.</p>
            <p>Render count: {count}</p>
            <button onClick={() => setX(x + 1)}>Rerender</button>
            <SpeakerHint>
                <ol>
                    <li>Опиши разницу между видами сборки react-dom</li>
                    <li>
                        Опиши влияние Strict Mode на профиль; открой эту страницу → переключай Strict Mode → нажимай
                        кнопку «Rerender» → смотри, как увеличивается счётчик рендеров.
                    </li>
                </ol>
            </SpeakerHint>
        </div>
    );
}
