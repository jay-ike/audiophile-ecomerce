import { createEffect, For, onMount, Show } from "solid-js";
import { Logo } from "./footer";
import { getNavContext } from "./header.context.jsx";
import Cathegories from "./cathegory.jsx";
import ItemCounter from "./item-counter.jsx";
import assets from "../assets/icons.svg?url";
import utils from "../utils";

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

function CartModal() {
    const [state, { addToCart, removeToCart, closeCart, toggleCart }] = getNavContext();
    const formatter = utils.getFormatter();
    let cancel;

    createEffect(function() {
        if (state().cartActive) {
            cancel.focus();
        }
    });
    function incrementItem(event) {
        let { target } = event;
        addToCart({ id: target.id });
    }
    function decrementItem(event) {
        let { target } = event;
        removeToCart(target.id);
    }
    function toggleCartModal() {
        if (!state().menuOpened && !state().preventCartReveal) {
            toggleCart();
        }
    }
    function handleKeyPress(event) {
        if (event.key === "Escape") {
            closeCart();
        }
    }

    return (
        <div class="m-backdrop" onKeyUp={handleKeyPress}>
            <div tabindex="0"></div>
            <div class="cart-modal" role="dialog" aria-label="list of items in your cart" aria-modal="true">
                <button ref={cancel} type="button" class="self-end no-padding" data-icon-theme="neutral" data-icon-position="end" data-icon="cross" aria-label="close the modal" onClick={toggleCartModal}></button>
                <form action="" class="column" on:counterincremented={incrementItem} on:counterdecremented={decrementItem}>
                    <div class="segragator not-empty-sibling">
                        <h4>Cart ({state().cartItems.itemsCount()})</h4>
                        <button class="reset-btn">Remove all</button>
                    </div>
                    <ul class="not-empty column">
                        <For each={state().cartItems.allItems()}>
                            {
                                (item) => (
                                    <li class="cart-item-grid">
                                        <h4>{item.name}</h4>
                                        <p>{formatter.formatCurrency(item.cost)}</p>
                                        <ItemCounter initialValue={item.count} name={item.name} id={item.id} />
                                        <div class="img-box">
                                            <img {...utils.copy(item.image).with({ width: 48, height: 48 })} />
                                        </div>
                                    </li>
                                )
                            }
                        </For>
                    </ul>
                    <dl class="segragator not-empty-sibling">
                        <dt class="caption-text">total</dt>
                        <dd><strong>{formatter.formatCurrency(state().cartItems.totalCost())}</strong></dd>
                    </dl>
                    <div class="center empty">
                        <svg width="128" height="128">
                            <title>illustration of an empty box</title>
                            <use href={assets + "#empty"} />
                        </svg>
                        <h5>There is no item in your cart</h5>
                        <p>To see your items here you should go to a product's page and click the <strong>"add to cart"</strong> button</p>
                    </div>
                    <a href="/checkout" class="btn-primary not-empty-sibling" onClick={closeCart}>checkout</a>
                </form>
            </div>
            <div tabindex="0"></div>
        </div>
    );
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
        const totalItems = state().cartItems.itemsCount();
        const canUpdateCount = (
            totalItems > 0 &&
            state().cartItems.itemsCount() !== oldState?.count &&
            !state().preventCartReveal
        );
        if (totalItems <= 0 || state().preventCartReveal) {
            delete components.cart.dataset.items;
        }

        if (canUpdateCount) {
            components.cart.dataset.items = shownCount(totalItems);
            components.cart.dataset.cart = getCartState(oldState?.count, totalItems);
            return Object.assign(newState, { count: totalItems });
        }
        if (state().menuOpened !== oldState?.menuOpened) {
            document.documentElement.dataset.menuOpened = state().menuOpened;
            return Object.assign(newState, { menuOpened: state().menuOpened });
        }
        if (state().cartActive) {
            document.documentElement.dataset.cartActive = state().cartActive;
            components.cartScope.enterScope();
        } else {
            delete document.documentElement.dataset.cartActive;
            document.body.focus();
        }
        return oldState;
    });

    onMount(function() {
        observer.observe(document.documentElement);
    });
    function toggleCartModal() {
        if (!state().menuOpened) {
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
            <nav class="row box">
                <button aria-label={(state().menuOpened ? "close" : "open") + " the menu"}
                    class="xl-remove no-padding"
                    aria-pressed={state().menuOpened}
                    onClick={toggleMenuState}>
                    <svg width="24" height="24">
                        <title>hamburger icon</title>
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
                    aria-label={(state().cartActive ? "close" : "reveal") + " your cart"}
                    aria-pressed={state().cartActive}
                    ref={components.cart}
                    data-cart="idle"
                    disabled={state().preventCartReveal}
                    onAnimationEnd={handleAnimation}
                    onClick={toggleCartModal}>
                    <svg width="24" height="24">
                        <title>a shopping cart illustration</title>
                        <use href={assets + "#cart"} />
                    </svg>
                </button>
            </nav>
            <Show when={state().preventCartReveal === false}>
                <focus-scope ref={components.cartScope}>
                    <CartModal />
                </focus-scope>
            </Show>
            <div class="menu">
                <Cathegories />
            </div>

            {props.children}
        </>
    );
}

export default Header;
