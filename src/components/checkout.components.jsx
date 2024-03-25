import { For, onMount } from "solid-js";
import { getNavContext } from "./header.context.jsx";
import icons from "../assets/icons.svg";
import style from "../checkout.module.css";

const plural = (count) => (
    count > 1
        ? "s"
        : ""
);


function CheckoutSummary(props) {
    const [navState, { hideCartModal }] = getNavContext();

    onMount(function() {
        hideCartModal();
    });

    return (
        <div class="box column">
            <h2>summary</h2>
            <ul class="not-empty column">
                <For each={navState().cartItems.allItems()}>
                    {
                        (item) => (
                            <li class="item-grid">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                                <span aria-label={item.count + " item" + plural(item.count)}>x{item.count}</span>
                                <div class="img-box">
                                    <img {...item.image} />
                                </div>
                            </li>
                        )
                    }
                </For>
            </ul>
            <div class="center empty">
                <svg width="128" height="128">
                    <title>illustration of an empty box</title>
                    <use href={icons + "#empty"} />
                </svg>
                <h5>There is no item in your cart</h5>
                <p>To see your items here you should go to a product's page and click the <strong>"add to cart"</strong> button</p>
            </div>

            <dl class={style["c-recap"] + " not-empty-sibling stack"}>
                <div>
                    <dt>total</dt>
                    <dd>$ 5,490</dd>
                </div>
                <div>
                    <dt>shipping</dt>
                    <dd>$ 50</dd>
                </div>
                <div>
                    <dt>VAT(included)</dt>
                    <dd>$ 1,076</dd>
                </div>
                <div>
                    <dt>Grand total</dt>
                    <dd>$ 5,540</dd>
                </div>
            </dl>
            <button type="button" class="btn-primary" onClick={props.onPayment}>continue & pay</button>
        </div>
    );
}

function CheckoutModal(props) {
    const [navState] = getNavContext();
    return (
        <dialog class={style["c-dialog"] + " column box"} ref={props.ref}>
            <h2>thank you<br />for your order</h2>
            <p>You will receive an email confirmation shortly.</p>
            <div class="column no-gap">
                <ul class={style["recap-box"] + " column box"}>
                    <For each={navState().cartItems.allItems()}>
                        {
                            (item) => (
                                <li class="item-grid">
                                    <h4>{item.name}</h4>
                                    <p>{item.price}</p>
                                    <span aria-label={item.count + " item" + plural(item.count)}>x{item.count}</span>
                                    <div class="img-box">
                                        <img {...item.image} />
                                    </div>
                                </li>
                            )
                        }
                    </For>
                </ul>
                <dl class={style["total-box"] + " column box"}>
                    <dt>grand total</dt>
                    <dd><strong>$ 2,390</strong></dd>
                </dl>
            </div>
            <a class="btn-primary" href="">back to home</a>
        </dialog>
    );
}

export {
    CheckoutModal,
    CheckoutSummary
};
