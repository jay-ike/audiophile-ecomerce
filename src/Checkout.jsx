import { For } from "solid-js";
import { Header, NavProvider, getNavContext } from "./components";

const fieldsets = [
    {
        title: "Billing details",
        inputs: [
            {
                metadata: { "type": "text", "id": "s-name", "name": "shippingName", "autocomplete": "name", "data-new": "", "required": true },
                "label": "name"
            },
            {
                metadata: { "type": "email", "id": "s-mail", "name": "shippingEmail", "autocomplete": "email", "data-new": "", "required": true, "placeholder": "ex. john@doe.me" },
                "label": "email address"
            },

            {
                metadata: { "type": "tel", "id": "s-tel", "name": "shippingPhone", "autocomplete": "tel", "data-new": "", "required": true, "placeholder": "ex. +237649383039", "pattern": "^\+\d{1,3}\d{8,12}$" },
                "label": "phone number"
            },

        ]
    },
    {
        title: "shipping infos",
        inputs: [
            {
                metadata: { "type": "text", "id": "s-address", "name": "address", "autocomplete": "address-line1" },
                "label": "your address"
            },
            {
                metadata: { "type": "text", "id": "s-zip", "name": "postCode", "autocomplete": "postal-code" },
                "label": "zip code"
            },
            {
                metadata: { "type": "text", "id": "s-city", "name": "city", "autocomplete": "address-line2" },
                "label": "city"
            },
            {
                metadata: { "type": "text", "id": "s-country", "name": "country", "autocomplete": "country-name" },
                "label": "country"
            },

        ]
    }

];

function CheckoutPage() {
    return (
        <NavProvider>
            <Header>
                <a href="">go back</a>
            </Header>
            <main>
                <h1>checkout</h1>
                <form action="">
                    <step-by-step>
                        <For each={fieldsets}>
                            {
                                (set) => (
                                    <fieldset className="input-step stack">
                                        <legend>{set.title}</legend>
                                        <For each={set.inputs}>
                                            {
                                                (entry) => (
                                                    <div>
                                                        <input {...entry.metadata} />
                                                        <label for={entry.metadata.id}>{entry.label}</label>
                                                    </div>
                                                )
                                            }
                                        </For>
                                    </fieldset>
                                )
                            }
                        </For>
                        <fieldset className="input-step stack">
                            <legend>payment details</legend>
                            <div class="pm-grid">
                                <h5 class="capitalize">payment method</h5>
                                <label class="box row"><input type="radio" id="e-money" value="mobile" name="paymentType" /> e-Money</label>
                                <label class="box row"><input type="radio" id="cash" value="cash" name="paymentType" /> cash on delivery</label>
                            </div>
                            <div className="column" data-payment="mobile">
                                <div><input type="text" id="t-number" pattern="" name="transNumber"/><label htmlFor="">e-Money number</label></div>
                                <div><input type="text" id="t-pin" pattern="\d{4,}" name="transPin"/><label htmlFor="">e-Money PIN</label></div>
                            </div>
                        </fieldset>
                    </step-by-step>
                </form>
            </main>
        </NavProvider>
    );
}

export default CheckoutPage;
