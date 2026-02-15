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

## Демо по разделам

### 3. React Profiler

- **Страница:** раздел «3. React Profiler».
- **Лёгкий и тяжёлый рендер:** переключатель «Лёгкий рендер» / «Тяжёлый рендер»; в тяжёлом режиме в рендере выполняется искусственная задержка (~80 ms), в React DevTools Profiler виден долгий commit.
- **Profiler:** кнопки «Старт Profiler» / «Стоп» — запись коммитов через `<Profiler onRender>`, сводка выводится на страницу и в консоль.
- **Self-profiling:** кнопки «Старт Self-profiling» / «Стоп и скачать» — запись профиля, по остановке экспорт профиля в JSON и скачивание файла.
- **Как показывать:** записать профиль в React DevTools (Record → действия на странице → стоп), разобрать флеймграф. Для production-подобного билда: `npm run build:profiling` и `npm run preview:profiling`.

### 4. DevTools Performance

- **Страница:** раздел «4. DevTools Performance».
- **Сценарий:** тот же тяжёлый рендер (список + искусственная задержка). Записать в Chrome DevTools Performance, посмотреть блок Scripting.
- **Strict Mode:** переключатель в шапке; при включённом Strict Mode в dev React дважды вызывает рендер — в записи Performance два пика. Сравнить с/без Strict Mode.

## Требования и план

- [Требования к демо](requirements.md)
- [План реализации](implementation-plan.md)
