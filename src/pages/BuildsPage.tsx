import { useState } from "react";
import { SpeakerHint } from "../components/SpeakerHint";

let count = 0;

export function BuildsPage() {
    const [x, setX] = useState(0);
    count++;
    console.log("Render BuildsPage", count);

    return (
        <div>
            <h1>1. Сборки и окружение</h1>
            <p>Описание режимов (development / production / profiling), переключатель Strict Mode.</p>
            <p>Render count: {count}</p>
            <button onClick={() => setX(x + 1)}>Rerender</button>
            <SpeakerHint>
                Демо режимов сборки и переключателя Strict Mode; открой эту страницу → переключай Strict Mode → нажимай
                кнопку «Rerender» → смотри, как увеличивается счетчик рендеров.
            </SpeakerHint>
        </div>
    );
}
