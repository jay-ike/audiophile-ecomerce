import { createEffect, For, onMount, Show } from "solid-js";
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

function handleAnimation(event) {
    const { target } = event;
    if (event.animationName === "jiggle") {
        target.dataset.cart = "idle";
    }
}

function Header(props) {
    const links = ["home", "headphones", "speakers", "earphones"];
    const [state, { closeMenu, toggleMenu, toggleCart }] = getNavContext();
    const components = {};
    const observer = new ResizeObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.borderBoxSize[0].inlineSize >= 768) {
                closeMenu();
                delete entry.target.dataset.menuOpened;
            }
            if (entry.borderBoxSize[0].inlineSize < 768) {
                entry.target.dataset.menuOpened = state().menuOpened;
            }
        });
    });

    createEffect(function(oldState) {
        let newState = oldState ?? {};

        if (state().cartItems.allItems() > 0 && state().cartItems.allItems() !== oldState?.count) {
            components.cart.dataset.items = shownCount(state().cartItems.allItems());
            components.cart.dataset.cart = getCartState(oldState?.count, state().cartItems.allItems());
            return Object.assign(newState, { count: state().cartItems.allItems() });
        }
        if (state().menuOpened !== oldState?.menuOpened) {
            document.documentElement.dataset.menuOpened = state().menuOpened;
            return Object.assign(newState, { menuOpened: state().menuOpened });
        }
        if (state().cartActive) {
            document.documentElement.dataset.cartActive = state().cartActive;
        } else {
            delete document.documentElement.dataset.cartActive;
        }
        return oldState;
    });

    onMount(function() {
        observer.observe(document.documentElement);
    });
    function toggleCartModal() {
        if (!state().menuOpened && !state().preventCartReveal) {
            toggleCart();
        }
    }
    function toggleMenuState() {
        if (!state().cartActive) {
            toggleMenu();
        }
    }
    return (
        <>
            <Show when={state().preventCartReveal === false}>
                <div class="cart-modal" role="dialog" aria-label="list of items in your cart">
                    <button class="self-end no-padding" data-icon-theme="neutral" data-icon-position="end" data-icon="cross" aria-label="close the modal" onClick={toggleCartModal}></button>
                    <div class="segragator">
                        <h4>Cart ({state().cartItems.allItems()})</h4>
                        <Show when={state().cartItems.allItems() > 0}>
                            <button class="reset-btn">Remove all</button>
                        </Show>
                    </div>
                    <form action="" class="column">
                        <dl class="segragator">
                            <dt class="caption-text">total</dt>
                            <dd><strong>$ 2000</strong></dd>
                        </dl>
                        <button type="button" class="btn-primary">checkout</button>
                    </form>
                </div>
            </Show>
            <nav class="row box">
                <button aria-label={(state().menuOpened ? "close" : "open") + " the menu"}
                    class="xl-remove no-padding"
                    aria-pressed={state().menuOpened}
                    onClick={toggleMenuState}>
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
                <button
                    class="box"
                    aria-label={(state().cartActive ? "close" : "reveal") + " your cart"}
                    aria-pressed={state().cartActive}
                    ref={components.cart}
                    href=""
                    data-cart="idle"
                    onAnimationEnd={handleAnimation}
                    onClick={toggleCartModal}>
                    <svg width="24" height="24">
                        <title>a shopping cart illustration</title>
                        <use href={assets + "#cart"} />
                    </svg>
                </button>
            </nav>
            {props.children}
        </>
    );
}

export default Header;
