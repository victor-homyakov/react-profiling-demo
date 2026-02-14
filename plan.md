https://podlodka.io/reactcrew 23-27 марта

# Предварительный план

## Профилирование

- development-, production- и profiling-сборки react-dom, в чём разница

### React DevTools

Только dev- и profiling-сборки. Можно увидеть причины рендера, и какие компоненты не ререндерились (успешная мемоизация).

### React Profiler

Использование локально. Использование в продакшене.

### DevTools Performance

Локально. Обратить внимание на проблемы strict mode и dev-сборки.

### Self-profiling API

Использование в продакшене.

### Анализ профиля

- Как выглядит профиль с useTransition
- Как на профиле отличить медленный рендер от частых попыток рендера в конкурентном рендеринге
- Как увидеть UI starvation. Причины при быстром рендере (useLayoutEffect + getBoundingClientRect, тяжёлое обновление UI на onInput без useTransition, медленный layout в сложной разметке etc.)

### Диагностика проблем

- INP, проблема "React рендерит быстро, а INP 500 мс" - когда тормозит не React, а GC или Layout
- Почему мемоизации useMemo и useCallback иногда ухудшают INP (тут два кейса: когда мемоизация работает, и когда она не работает)
- Проблемы плохой мемоизации и нестабильных пропсов - WDYR
- Проверка кандидатов на мемоизацию - useWhyDidYouUpdate
- Поиск частых и длительных ререндеров - производная от WDYR или pnpm-патч реакта

## Память и утечки

### Диагностика факта утечки

- queryObjects
- Performance monitor
- Memory - Detached elements
- Память в useMemo и reselect - не утечки

### Поиск утечки

- Memory - Allocations on timeline
- Memory - метод трёх снапшотов
