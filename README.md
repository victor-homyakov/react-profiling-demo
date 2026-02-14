# React Demo — Profiling & Memory

Демо-приложение для доклада на тему "React 19, профилирование и память".

## Режимы сборки

Приложение можно запускать в трёх режимах.

### 1. Development

- **Команда:** `npm run dev`
- **Сборка react-dom:** dev-сборка (подсказки, двойной рендер в Strict Mode, проверки).
- **Использование:** локальная разработка, React DevTools с подсветкой обновлений и причинами рендера.

### 2. Production

- **Команды:** `npm run build` → `npm run preview`
- **Сборка react-dom:** production (минифицированная, без инструментов).
- **Использование:** оценка реальной производительности, замер INP без накладных расходов dev.

### 3. Profiling

- **Команды:** `npm run build:profiling` → `npm run preview:profiling` (или `npm run preview` после build:profiling).
- **Сборка react-dom:** `react-dom/profiling` (включена поддержка React Profiler в production-подобном билде).
- **Использование:** запись профиля в React DevTools Profiler на «продакшен-подобном» билде.

## Строгий режим (Strict Mode)

- Включён по умолчанию.
- Переключатель — в шапке приложения (индикатор режима сборки).
- Отключение полезно для сравнения одной и той же операции в Chrome Performance с Strict Mode и без (двойной рендер в dev).

## Структура проекта

- `src/pages/` — страницы-разделы по плану доклада.
- `src/components/` — переиспользуемые компоненты.
- `src/demos/` — компоненты демо по темам.
- `src/hooks/` — кастомные хуки.
- `src/contexts/` — контексты (например, Strict Mode).

## Требования и план

- [Требования к демо](requirements.md)
- [План реализации](implementation-plan.md)
