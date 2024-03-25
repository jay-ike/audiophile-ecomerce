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
        const canUpdateCount = (
            state().cartItems.itemsCount() > 0 &&
            state().cartItems.itemsCount() !== oldState?.count &&
            !state().preventCartReveal
        );

        if (canUpdateCount) {
            components.cart.dataset.items = shownCount(state().cartItems.itemsCount());
            components.cart.dataset.cart = getCartState(oldState?.count, state().cartItems.itemsCount());
            return Object.assign(newState, { count: state().cartItems.itemsCount() });
        }
        if (state().menuOpened !== oldState?.menuOpened) {
            document.documentElement.dataset.menuOpened = state().menuOpened;
            return Object.assign(newState, { menuOpened: state().menuOpened });
        }
        if (state().cartActive) {
            document.documentElement.dataset.cartActive = state().cartActive;
            components.scope.enterScope();
        } else {
            delete document.documentElement.dataset.cartActive;
        }
        if (state().preventCartReveal) {
            delete components.cart.dataset.items;
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
                <focus-scope ref={components.scope}>
                    <div class="cart-modal" role="dialog" aria-label="list of items in your cart">
                        <button type="button" class="self-end no-padding" data-icon-theme="neutral" data-icon-position="end" data-icon="cross" aria-label="close the modal" onClick={toggleCartModal}></button>
                        <form action="" class="column">
                            <div class="not-empty"></div>
                            <div class="segragator not-empty-sibling">
                                <h4>Cart ({state().cartItems.itemsCount()})</h4>
                                <button class="reset-btn">Remove all</button>
                            </div>
                            <dl class="segragator not-empty-sibling">
                                <dt class="caption-text">total</dt>
                                <dd><strong>$ 2000</strong></dd>
                            </dl>
                            <div class="center empty">
                                <svg width="128" height="128">
                                    <title>illustration of an empty box</title>
                                    <use href={assets + "#empty"} />
                                </svg>
                                <h5>There is no item in your cart</h5>
                                <p>To see your items here you should go to a product's page and click the <strong>"add to cart"</strong> button</p>
                            </div>
                            <button type="button" class="btn-primary not-empty-sibling">checkout</button>
                        </form>
                    </div>
                </focus-scope>
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
