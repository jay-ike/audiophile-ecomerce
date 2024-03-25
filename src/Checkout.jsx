import { createSignal, For, onMount } from "solid-js";
import { Footer, Header, NavProvider, getNavContext } from "./components";
import icons from "./assets/icons.svg";
import style from "./checkout.module.css";

const fieldsets = [
    {
        title: "Billing details",
        inputs: [
            {
                "errorMessage": "No name provided",
                "label": "name",
                metadata: { "type": "text", "id": "s-name", "name": "shippingName", "autocomplete": "name", "data-new": "", "required": true }
            },
            {
                "errorMessage": "invalid email",
                "label": "email address",
                metadata: { "type": "email", "id": "s-mail", "name": "shippingEmail", "autocomplete": "email", "data-new": "", "required": true, "placeholder": "ex. john@doe.me" }
            },

            {
                "errorMessage": "Wrong format",
                "label": "phone number",
                metadata: { "type": "tel", "id": "s-tel", "name": "shippingPhone", "autocomplete": "tel", "data-new": "", "required": true, "placeholder": "ex. +237649383039", "pattern": "^\\+\\d{1,3}\\d{8,12}$" }
            },
        ]
    },
    {
        title: "shipping infos",
        inputs: [
            {
                "errorMessage": "can not be empty",
                "label": "your address",
                metadata: { "type": "text", "id": "s-address", "name": "address", "autocomplete": "address-line1", required: true, "data-new": "" }
            },
            {
                "label": "zip code",
                metadata: { "type": "text", "id": "s-zip", "name": "postCode", "autocomplete": "postal-code" }
            },
            {
                "errorMessage": "can not be empty",
                "label": "city",
                metadata: { "type": "text", "id": "s-city", "name": "city", "autocomplete": "address-line2", required: true, "data-new": "" }
            },
            {
                "errorMessage": "can not be empty",
                "label": "country",
                metadata: { "type": "text", "id": "s-country", "name": "country", "autocomplete": "country-name", required: true, "data-new": "" }
            },
        ]
    }
];
const steps = ["your informations", "the shipping address", "how will you pay ?"];
const plural = (count) => (
    count > 1
        ? "s"
        : ""
);

function Indicator(props) {
    return (
        <ul class={style["step-indicator"]}>
            <For each={props.steps}>
                {
                    (step, index) => <li {...(props.current() === index() ? { "class": style["step-active"] } : {})}><p>{step}</p></li>
                }
            </For>
        </ul>
    );
}

function Summary() {
    const [navState, { hideCartModal }] = getNavContext();

    onMount(function() {
        hideCartModal();
    });

    return (
        <div className="box column">
            <h2>summary</h2>
            <ul className="not-empty column">
                <For each={navState().cartItems.allItems()}>
                    {
                        (item) => (
                            <li className="item-grid">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                                <span aria-label={item.count + " item" + plural(item.count)}>x{item.count}</span>
                                <div className="img-box">
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
            <button className="box btn-primary">continue & pay</button>
        </div>
    );
}

function CheckoutPage() {
    const components = Object.create(null);
    const [currentStep, setStep] = createSignal(0);

    function requestNextFormStep() {
        const selector = "step-by-step > :not(.step-out) :is(input,select)";
        let inputFields = Array.from(components.form.querySelectorAll(selector));
        if (allFieldsValid(inputFields)) {
            components.form.firstElementChild.nextStep();
        }
    }

    function handleInputFocus({ target }) {
        target.dataset.new = "";
    }

    function allFieldsValid(fields) {
        return fields.every(function(field) {
            delete field.dataset.new;
            return field.checkValidity();
        });
    }

    function stepUpdater({ detail }) {
        const { current } = detail;
        if (current > 0) {
            components.prev.disabled = false;
        } else {
            components.prev.disabled = true;
        }
        if (current === steps.length - 1) {
            components.next.disabled = true;
        } else {
            components.next.disabled = false;
        }
        setStep(current);
    }

    function previousStep() {
        components.form.firstElementChild.previousStep();
    }

    function handleChange({ target }) {
        const { form } = components;
        if (target.name !== "paymentType") {
            return;
        }
        if (form.elements.paymentType.value === "mobile") {
            delete form.dataset.cashSelected;
            form.dataset.mobileSelected = "";
        } else {
            delete form.dataset.mobileSelected;
            form.dataset.cashSelected = "";
        }
    }

    return (
        <NavProvider>
            <Header>
                <div class="main-content"><a href="" className="capitalized">go back</a></div>
            </Header>
            <form class={style["c-form"] + " main-content"} action="" data-mobile-selected ref={components.form} onFocusIn={handleInputFocus} onChange={handleChange}>
                <div class="box stack">
                    <h1>checkout</h1>
                    <Indicator steps={steps} current={currentStep} />
                    <div class="segragator no-gap no-padding">
                        <button ref={components.prev} aria-label="previous step" class="box row" id="prev_step" type="button" data-icon-position="start" data-icon="arrow_left" disabled="true" autocomplete="off" onClick={previousStep}>previous</button>
                        <button ref={components.next} aria-label="next step" class="box row" id="next_step" type="button" data-icon-position="end" data-icon="arrow_right" onClick={requestNextFormStep}>next</button>
                    </div>
                    <step-by-step on:indexupdated={stepUpdater}>
                        <For each={fieldsets}>
                            {
                                (set) => (
                                    <fieldset class="input-step stack">
                                        <legend>{set.title}</legend>
                                        <For each={set.inputs}>
                                            {
                                                (entry) => (
                                                    <div>
                                                        <input {...entry.metadata} />
                                                        <label for={entry.metadata.id} {...{ "data-error": entry.errorMessage }}>{entry.label}</label>
                                                    </div>
                                                )
                                            }
                                        </For>
                                    </fieldset>
                                )
                            }
                        </For>
                        <fieldset class="input-step stack">
                            <legend>payment details</legend>
                            <div class="pm-grid">
                                <h5 class="capitalize">payment method</h5>
                                <div class="relative">
                                    <input type="radio" id="e-money" value="mobile" name="paymentType" checked />
                                    <label class="box" for="e-money">e-Money</label>
                                </div>
                                <div class="relative">
                                    <input type="radio" id="cash" value="cash" name="paymentType" />
                                    <label class="box" for="cash">cash on delivery</label>
                                </div>
                            </div>
                            <div class="column" data-payment="mobile">
                                <div><input type="text" id="t-number" pattern="" name="transNumber" /><label htmlFor="">e-Money number</label></div>
                                <div><input type="text" id="t-pin" pattern="\d{4,}" name="transPin" /><label htmlFor="">e-Money PIN</label></div>
                            </div>
                            <div class="row" data-payment="cash">
                                <svg width="48" height="48" class="no-shrink" data-icon-theme="primary">
                                    <title>illustration of a cash payment</title>
                                    <use href={icons + "#cash-on-payment"} />
                                </svg>
                                <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                            </div>
                        </fieldset>
                    </step-by-step>
                </div>
                <Summary />
            </form>
            <Footer />
        </NavProvider>
    );
}

export default CheckoutPage;
