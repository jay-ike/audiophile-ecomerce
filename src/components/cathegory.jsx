import { For } from "solid-js";
import { categoryAssets } from "./assets.map.jsx";
function mapper(metadata) {
    return Object.entries(metadata).map(function([key, val]) {
        const result = Object.assign({}, val);
        result.name = key;
        return result;
    });
}
function triggerEvent({ target }) {
    const event = new CustomEvent("menuselected", {
        bubbles: true,
        details: { action: "close menu" }
    });
    target.dispatchEvent(event);
}
function Category(props) {
    return (
        <li class="box">
            <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
            <h3>{props.name}</h3>
            <a href={props.link} data-icon-position="end" data-icon="arrow_right" onClick={triggerEvent}>
                shop
            </a>
        </li>
    );
}

function Categories(props) {
    return (
        <ul class={props.class + " categories column"} role="list">
            <For each={mapper(categoryAssets)}>
                {
                    (item) => (
                        <Category {...item} />
                    )
                }
            </For>
        </ul>
    );
}

export default Categories;
