import { SpeakerHint } from "../components/SpeakerHint";

export function MemoryPage() {
    return (
        <div>
            <h1>7. Память и утечки</h1>
            <p>queryObjects, Performance monitor, Detached, useMemo не утечка, Allocations, три снапшота.</p>
            <SpeakerHint>
                Здесь будет демо утечек и работы с памятью; в докладе: открой DevTools Memory → Snapshot (или
                Allocations on timeline) → открой и закрой модалку с утечкой → сделай второй снапшот и сравни количество
                объектов (метод трёх снапшотов).
            </SpeakerHint>
        </div>
    );
}
