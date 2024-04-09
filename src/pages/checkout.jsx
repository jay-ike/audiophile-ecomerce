import { createSignal, For } from "solid-js";
import {useBeforeLeave} from "@solidjs/router";
import { CheckoutModal, CheckoutSummary, Footer, Header, getNavContext} from "../components";
import icons from "../assets/icons.svg";
import style from "../assets/styles/checkout.module.css";
import utils from "../utils";

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
                "errorMessage": "cannot be empty",
                "label": "your address",
                metadata: { "type": "text", "id": "s-address", "name": "address", "autocomplete": "address-line1", required: true, "data-new": "" }
            },
            {
                "label": "zip code",
                metadata: { "type": "text", "id": "s-zip", "name": "postCode", "autocomplete": "postal-code" }
            },
            {
                "errorMessage": "cannot be empty",
                "label": "city",
                metadata: { "type": "text", "id": "s-city", "name": "city", "autocomplete": "address-line2", required: true, "data-new": "" }
            },
            {
                "errorMessage": "cannot be empty",
                "label": "country",
                metadata: { "type": "text", "id": "s-country", "name": "country", "autocomplete": "country-name", required: true, "data-new": "" }
            },
        ]
    }
];
const steps = ["your informations", "the shipping address", "how will you pay ?"];

function Indicator(props) {
    return (
        <ul class={style["step-indicator"]}>
            <For each={props.steps}>
                {
                    (step, index) => <li {...(props.current === index() ? { "class": style["step-active"] } : {})}><p>{step}</p></li>
                }
            </For>
        </ul>
    );
}


function CheckoutPage() {
    const components = Object.create(null);
    const [, {showCartModal}] = getNavContext();
    const [formState, setFormState] = createSignal({currentStep: 0, payment: "mobile", valid: false});

    function getInputFields() {
        const selector = "step-by-step > :not(.step-out) :is(input,select)";
        return Array.from(components.form.querySelectorAll(selector));
    }

    function requestNextFormStep() {
        if (allFieldsValid(getInputFields())) {
            components.form.querySelector("step-by-step").nextStep();
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
        const state = utils.clone(formState());
        state.currentStep = current;
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
        setFormState(state);
    }

    function previousStep() {
        components.form.querySelector("step-by-step").previousStep();
    }

    function handleChange({ target }) {
        const { form } = components;
        const state = utils.clone(formState());
        if (target.name !== "paymentType") {
            return;
        }
        if (form.elements.paymentType.value === "mobile") {
            delete form.dataset.cashSelected;
            form.dataset.mobileSelected = "";
            state.payment = "mobile";
        } else {
            delete form.dataset.mobileSelected;
            form.dataset.cashSelected = "";
            state.payment = "cash";
        }
        form.querySelectorAll("[data-payment='mobile'] input").forEach(
            function (input) {
                input.required = (state.payment === "mobile");
            }
        );
        state.valid = form.checkValidity();
        setFormState(state);
    }

    function paymentRequested() {
        components.dialog.showModal();
    }

    useBeforeLeave(function () {
        showCartModal();
    });

    return (
        <>
            <Header>
                <div class={style["light-bg"] + " main-content"}><a href="/" class="capitalize back-btn">go back</a></div>
            </Header>
            <form class={style["c-form"] + " main-content "} action="" data-mobile-selected ref={components.form} onFocusIn={handleInputFocus} onChange={handleChange}>
                <div class="box stack">
                    <h1>checkout</h1>
                    <Indicator steps={steps} current={formState().currentStep} />
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
                                <div><input type="text" id="t-number" pattern="^\\+\d{1,3}\d{8,12}$" name="transNumber" placeholder="ex. +237649383039" /><label for="t-number" data-error="wrong format">e-Money number</label></div>
                                <div><input type="text" id="t-pin" pattern="\d{4,}" name="transPin" placeholder="ex. 1234"  /><label for="t-pin" data-error="wrong format">e-Money PIN</label></div>
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
                <CheckoutSummary onPayment={() => components.dialog.showModal()} canNotPay={!formState().valid}/>
            </form>
            <Footer />
            <CheckoutModal ref={components.dialog}/>
        </>
    );
}

export default CheckoutPage;
