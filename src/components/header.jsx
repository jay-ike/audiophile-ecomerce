import { createEffect, For, onMount } from "solid-js";
import { Logo } from "./footer";
import { getNavContext } from "./header.context.jsx";
import assets from "../assets/icons.svg?url";

function getPageState(current, given) {
    if (current === given) {
        return { "aria-current": "page" };
    }
    return {};
}

const shownCount = (count) => (
    count > 99
        ? "99+"
        : count
);

const getCartState = (oldItems, newItems) => (
    oldItems > newItems
        ? "reduced"
        : "added"
);

const observer = new ResizeObserver(function(entries) {
    entries.forEach(function (entry) {
        if (entry.borderBoxSize[0].inlineSize >= 768) {
            delete document.documentElement.dataset.menuOpened;
        }
    });
});

function handleAnimation(event) {
    const { target } = event;
    if (event.animationName === "jiggle") {
        target.dataset.cart = "idle";
    }
}

function Header(props) {
    const links = ["home", "headphones", "speakers", "earphones"];
    const [state, { toggleMenu }] = getNavContext();
    const components = {};

    createEffect(function(oldState) {
        let newState = oldState ?? {};

        if (state().cartItems > 0 && state().cartItems !== oldState?.count) {
            components.cart.dataset.items = shownCount(state().cartItems);
            components.cart.dataset.cart = getCartState(oldState?.count, state().cartItems);
            return Object.assign(newState, { count: state().cartItems });
        }
        if (state().menuOpened !== oldState?.menuOpened) {
            document.documentElement.dataset.menuOpened = state().menuOpened;
            return Object.assign(newState, { menuOpened: state().menuOpened });
        }
        return oldState;
    });

    onMount(function () {
        observer.observe(document.documentElement);
    });
    return (
        <header>
            <nav class="row box">
                <button aria-label={(state().menuOpened ? "close" : "open") + " the menu"} class="xl-remove no-padding" aria-pressed={state().menuOpened} onClick={toggleMenu}>
                    <svg width="24" height="24">
                        <title>hamburger menu</title>
                        <use href={assets + "#hamburger"} />
                    </svg>
                </button>
                <Logo />
                <ul class="row xl-show" role="list">
                    <For each={links}>
                        {
                            (link) => (
                                <li><a href="" {...getPageState(props.currentPage ?? "home", link)}>{link}</a></li>
                            )
                        }
                    </For>
                </ul>
                <a ref={components.cart} href="" data-cart="idle" onAnimationEnd={handleAnimation}>
                    <svg width="24" height="24">
                        <use href={assets + "#cart"} />
                    </svg>
                </a>
            </nav>
            {props.children}
        </header>
    );
}

export default Header;
