import { Show } from "solid-js";
import utils from "../utils";

function ProductDescription(props) {
    return (
        <section class={(props.class ?? "") + " column"}>
            <div class="img-box">
                <img {...utils.copy(props.data.image).updateAttributes({url: "src"})} />
            </div>
            <div class="stack">
                <Show when={props.data["new-product"]}><i>new product</i></Show>
                <Show when={props.isPrimary} fallback={<h2>{props.data.name}</h2>}>
                    <h1>{props.data.name}</h1>
                </Show>
                <p>{props.data.description}</p>
                {props.children}
            </div>
        </section>
    );
}
export default ProductDescription;
