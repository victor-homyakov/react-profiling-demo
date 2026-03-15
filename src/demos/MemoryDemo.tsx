import React, { PureComponent, useCallback, useMemo, useState } from "react";

const blockStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
};

const buttonStyle: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid #94a3b8",
    background: "#f1f5f9",
    cursor: "pointer",
};

const closeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
};

const pStyle: React.CSSProperties = { margin: "0 0 12px", fontSize: "0.9em", color: "#64748b" };

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    minWidth: 340,
    maxWidth: 480,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
};

const h3Style: React.CSSProperties = { margin: "0 0 8px", fontSize: "1.05em" };

function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
}

/**
 * Class component with an intentional memory leak.
 * - Subscribes to beforeunload / pagehide but never unsubscribes.
 * - Stores a DOM ref via callback that ignores null, so the detached
 *   DOM node is retained after unmount.
 */
export class LeakyModalContent extends PureComponent<{ onClose: () => void }> {
    static displayName = "LeakyModalContent";

    componentDidMount() {
        window.addEventListener("beforeunload", this.handleUnload);
        window.addEventListener("pagehide", this.handleUnload);
    }

    domNode: HTMLDivElement | null = null;

    private setRef = (el: HTMLDivElement | null) => {
        if (el) {
            this.domNode = el;
        }
        if (Math.random() > 2) {
            console.log("setRef", el, this.domNode);
        }
    };

    private handleUnload = () => {
        this.props.onClose();
    };

    render() {
        const randomAttrName = `data-leaky-modal-${Math.random().toString(36).substring(2, 15)}`;
        const randomAttr = { [randomAttrName]: true };

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <div ref={this.setRef} style={modalContentStyle} {...randomAttr}>
                <h3 style={{ margin: "0 0 12px" }}>Модальное окно</h3>
                <p style={pStyle}>
                    Компонент модалки подписывается на <code>beforeunload</code> и <code>pagehide</code> при
                    монтировании, но <strong>не отписывается</strong> при размонтировании.
                </p>
                <p style={pStyle}>
                    Хранит ссылку на DOM-элемент в ref, который не очищается — после размонтирования элемент становится
                    detached, но остаётся в памяти.
                </p>
                <button onClick={this.props.onClose} style={closeButtonStyle} type="button">
                    Закрыть
                </button>
            </div>
        );
    }
}

(window as unknown as Record<string, unknown>).LeakyModalContent = LeakyModalContent;

function ModalWithLeak() {
    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [closeCount, setCloseCount] = useState(0);

    const handleOpen = () => {
        setIsOpen(true);
        setOpenCount((n) => n + 1);
    };

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setCloseCount((n) => n + 1);
    }, []);

    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>Модалка с утечкой</h3>

            <p style={pStyle}>
                При открытии монтируется компонент <code>LeakyModalContent</code> (это классовый компонент для
                облегчения поиска его экземпляров в памяти). При закрытии — размонтируется, но подписки на события и
                ссылка на DOM остаются в памяти.
            </p>

            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button disabled={isOpen} onClick={handleOpen} style={buttonStyle} type="button">
                    Открыть модалку
                </button>
                <span style={{ fontSize: "0.85em", color: "#64748b" }}>
                    Открытий: {openCount} | Закрытий: {closeCount}
                </span>
            </div>

            {isOpen ? (
                <div onClick={handleClose} role="presentation" style={overlayStyle}>
                    <div onClick={stopPropagation} role="presentation">
                        <LeakyModalContent onClose={handleClose} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

interface DataItem {
    id: number;
    value: string;
}

function createCachedSelector() {
    let cache: { input: null; result: null } | { input: DataItem[]; result: string[] } = { input: null, result: null };

    return (items: DataItem[]): string[] => {
        if (cache.input === items) {
            return cache.result;
        }

        cache = { input: items, result: items.map((item) => `[processed] ${item.value}`) };
        return cache.result;
    };
}

const selectProcessedData = createCachedSelector();

const MEMO_ITEM_COUNT = 10_000;

function ModalWithMemo() {
    const [modalOpen, setModalOpen] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const heavyData = useMemo<DataItem[]>(() => {
        if (!initialized) {
            return [];
        }
        console.log("allocating heavyData", initialized);
        return Array.from({ length: MEMO_ITEM_COUNT }, (_, i) => ({
            id: i,
            value: `item-${i}-${"x".repeat(100)}`,
        }));
    }, [initialized]);

    const processedData = useMemo(() => {
        if (heavyData.length === 0) {
            return [];
        }
        console.log("allocating processedData", heavyData.length);
        return selectProcessedData(heavyData);
    }, [heavyData]);

    const handleOpen = () => {
        setInitialized(true);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={blockStyle}>
            <h3 style={h3Style}>Модалка с useMemo и кэшем</h3>

            <p style={pStyle}>
                Компонент использует <code>useMemo</code> для создания {MEMO_ITEM_COUNT.toLocaleString()} объектов и
                кэширующий селектор (аналог reselect). Память выделяется при первом открытии модалки и не растёт при
                повторных открытиях.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                <button onClick={handleOpen} style={buttonStyle} type="button">
                    Открыть модалку
                </button>
                <span style={{ fontSize: "0.85em", color: "#64748b" }}>
                    useMemo: {heavyData.length.toLocaleString()} объектов | Селектор:{" "}
                    {processedData.length.toLocaleString()} строк
                </span>
            </div>

            {modalOpen ? (
                <div onClick={handleCloseModal} role="presentation" style={overlayStyle}>
                    <div onClick={stopPropagation} role="presentation" style={modalContentStyle}>
                        <h3 style={{ margin: "0 0 12px" }}>Модальное окно</h3>
                        <p style={pStyle}>
                            При первом открытии <code>useMemo</code> и селектор аллоцирует память. При повторных
                            открытиях память не растёт — кэш переиспользуется.
                        </p>
                        <p style={{ ...pStyle, fontWeight: 500 }}>
                            Объектов в useMemo: {heavyData.length.toLocaleString()} | В селекторе:{" "}
                            {processedData.length.toLocaleString()}
                        </p>
                        <button onClick={handleCloseModal} style={buttonStyle} type="button">
                            Закрыть
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export function MemoryDemo() {
    return (
        <div style={{ marginTop: 16 }}>
            <ModalWithLeak />
            <ModalWithMemo />
        </div>
    );
}
