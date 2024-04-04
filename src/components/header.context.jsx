import { createContext, createSignal, useContext } from "solid-js";
import {categoryAssets} from "./assets.map.jsx";
import utils from "../utils.js"

const NavContext = createContext({ items: 0, opened: false });
const fakeItems = [["iw209342", {
    cost: 539,
    count: 3,
    image: categoryAssets.earphones,
    name: "YX1",
}], ["id0w9ew3", {
    cost: 1023,
    count: 1,
    image: categoryAssets.headphones,
    name: "Bang & olufsen Xd",
}]];


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
        acc[key] = Object.assign(val, {id: key});
        return acc;
    }, Object.create(null));
    function addItem(id, data) {
        let clone;
        let dataClone;
        if (!data) {
            return new Cart(Object.entries(content));
        }
        clone = Object.assign({}, content);
        dataClone = Object.assign({}, data);
        dataClone.count = (clone[id]?.count ?? 0) + (dataClone.count ?? 1);
        clone[id] = Object.assign(clone[id] ?? {}, dataClone);
        return new Cart(Object.entries(clone));
    }
    function removeItem(id) {
        if (!content[id]) {
            return new Cart(Object.entries(content));
        }
        return updateContent(Object.assign({}, content), id, function(meta) {
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
        return Object.values(content);
    }
    function totalCost() {
        return allItems().reduce(
            (acc, val) => acc + ((val?.cost ?? 0) * (val?.count ?? 0)),
            0
        );
    }
    function itemsCount() {
        return allItems().reduce(
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
        itemsCount: {
            value: itemsCount,
            writable: false
        },
        removeItem: {
            value: removeItem,
            writable: false
        },
        totalCost: {
            value: totalCost,
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
                setState(utils.storeUpdater(
                    "cartItems", (items) => items.addItem(data.id, data)
                ));
            },
            closeCart() {
                setState(utils.storeUpdater("cartActive", () => false));
            },
            closeMenu() {
                setState(utils.storeUpdater("menuOpened", () => false));
            },
            hideCartModal() {
                setState(utils.storeUpdater("preventCartReveal", () => true));
            },
            openCart() {
                setState(utils.storeUpdater("cartActive", () => true));
            },
            openMenu() {
                setState(utils.storeUpdater("menuOpened", () => true));
            },
            removeToCart(id) {
                setState(utils.storeUpdater(
                    "cartItems", (items) => items.removeItem(id)
                ));
            },
            showCartModal() {
                setState(utils.storeUpdater("preventCartReveal", () => false));
            },
            toggleMenu() {
                setState(utils.storeUpdater("menuOpened", (state) => !state));
            },
            toggleCart() {
                setState(utils.storeUpdater("cartActive", (state) => !state));
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
