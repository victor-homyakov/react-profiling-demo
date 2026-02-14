import { SpeakerHint } from "../components/SpeakerHint";

export function BuildsPage() {
    return (
        <div>
            <h1>1. Сборки и окружение</h1>
            <p>Описание режимов (development / production / profiling), переключатель Strict Mode.</p>
            <SpeakerHint>
                Здесь будет демо режимов сборки и переключателя Strict Mode; в докладе: открой эту страницу → переключай
                Strict Mode и покажи индикатор режима внизу.
            </SpeakerHint>
        </div>
    );
}
