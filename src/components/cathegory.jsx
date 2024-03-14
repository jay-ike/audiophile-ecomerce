import {For} from "solid-js";
import assets from "../assets/icons.svg?url";
import {categoryAssets} from "./assets.map.jsx";
function mapper(metadata) {
    return Object.entries(metadata).map(function ([key, val]) {
        const result = Object.assign({}, val);
        result.name = key;
        return result;
    });
}
function Category(props) {
    return (
        <article class="box">
            <img src={props.source} alt={props.alt} width={props.width} height={props.height} />
            <h3>{props.name}</h3>
            <a href={props.link}>
                shop
                <svg width="24" height="24">
                    <use href={assets + "#right_arrow"} />
                </svg>
            </a>
        </article>
    );
}

function Categories() {
    return (
        <menu class="categories column">
            <For each={mapper(categoryAssets)}>
                {
                    (item) => (
                        <Category {...item} />
                    )
                }
            </For>
        </menu>
    );
}

export default Categories;
