import { createContext, createSignal, useContext } from "solid-js";

const NavContext = createContext({ items: 0, opened: false });

function storeUpdater(prop, computed) {
    return function(val) {
        const clone = Object.assign({}, val);
        if (clone[prop] !== undefined) {
            clone[prop] = computed(clone[prop]);
        }
        return clone;
    };
}

function updateContent(content, key, fn) {
    if (content[key] && typeof fn === "function") {
        content[key] = fn(content[key]);
        return new Cart(Object.entries(content).filter(
            ([id]) => content[id] !== null && content[id] !== undefined
        ));
    }
}
function Cart(entries = []) {
    const content = entries.reduce(function itemReducer(acc, [key, val]) {
        acc[key] = val;
        return acc;
    }, Object.create(null));
    function addItem(id, data) {
        if (!data) {
            return new Cart(Object.entries(content));
        }
        return updateContent(content, id, function(meta) {
            let clone;
            let count;
            count = meta?.count;
            clone = Object.assign(meta ?? {}, data);
            clone.count = (count ?? 0) + 1;
            return clone;
        });
    }
    function removeItem(id) {
        if (!content[id]) {
            return new Cart(Object.entries(content));
        }
        return updateContent(content, id, function(meta) {
            let clone;
            if (meta.count <= 1) {
                return;
            }
            clone = Object.assign({}, meta);
            clone.count = clone.count - 1;
            return clone;
        });
    }

    function allItems() {
        return Object.values(content).reduce(
            (acc, val) => acc + (val?.count ?? 0),
            0
        );
    }
    Object.defineProperties(content, {
        addItem: {
            value: addItem,
            writable: false
        },
        allItems: {
            value: allItems,
            writable: false
        },
        removeItem: {
            value: removeItem,
            writable: false
        }
    });
    return Object.freeze(content);
}

function NavProvider(props) {
    const [state, setState] = createSignal(
        {
            cartActive: props.cartActive ?? false,
            cartItems: props.cartItems ?? new Cart(),
            menuOpened: props.menuOpened ?? false,
            preventCartReveal: props.hideCart ?? false
        }
    );
    const navigationState = [
        state,
        {
            addToCart(data) {
                setState(storeUpdater(
                    "cartItems", (items) => items.addItem(data.id, data)
                ));
            },
            closeCart() {
                setState(storeUpdater("cartActive", () => false));
            },
            closeMenu() {
                setState(storeUpdater("menuOpened", () => false));
            },
            hideCartModal() {
                setState(storeUpdater("preventCartReveal", () => true));
            },
            openCart() {
                setState(storeUpdater("cartActive", () => true));
            },
            openMenu() {
                setState(storeUpdater("menuOpened", () => true));
            },
            removeToCart(id) {
                setState(storeUpdater(
                    "cartItems", (items) => items.removeItem(id)
                ));
            },
            showCartModal() {
                setState(storeUpdater("preventCartReveal", () => false));
            },
            toggleMenu() {
                setState(storeUpdater("menuOpened", (state) => !state));
            },
            toggleCart() {
                setState(storeUpdater("cartActive", (state) => !state));
            },
        }
    ];

    return (
        <NavContext.Provider value={navigationState}>
            {props.children}
        </NavContext.Provider>
    );
}

function getNavContext() {
    const context = useContext(NavContext);

    if (context === undefined) {
        throw new Error("Navigation Context is not available !!!");
    }
    return context;
}

export { getNavContext, NavProvider };
