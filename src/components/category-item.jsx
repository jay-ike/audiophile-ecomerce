import { Show } from "solid-js";

function ProductDescription(props) {
    const imageData = Object.entries(props.data.image).reduce(
        function (acc, [key, val]) {
            if (key === "url") {
                acc.src = val;
            } else {
                acc[key] = val;
            }
            return acc;
        },
        Object.create(null)
    );
    return (
        <section class={(props.class ?? "") + " column"}>
            <div class="img-box">
                <img {...imageData} />
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
