import {createContext, createSignal, useContext} from "solid-js";

const NavContext = createContext({items: 0, opened: false});

function storeUpdater(prop, computed) {
    return function (val){
        const clone = Object.assign({}, val);
        if (clone[prop] !== undefined) {
            clone[prop] = computed(clone[prop]);
        }
        return clone;
    };
}

function NavProvider(props) {
    const [state, setState] = createSignal(
        {cartItems: props.cartItems ?? 0, menuOpened: props.menuOpened ?? false}
    );
    const navigationState = [
        state,
        {
            closeMenu() {
                setState(storeUpdater("menuOpened", () => false));
            },
            openMenu() {
                setState(storeUpdater("menuOpened", () => true));
            },
            toggleMenu() {
                setState(storeUpdater("menuOpened", (state) => !state));
            },
            updateCart(items) {
                setState(storeUpdater("cartItems", () => items));
            }
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

export {getNavContext, NavProvider};
