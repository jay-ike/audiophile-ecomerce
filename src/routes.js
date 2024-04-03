import { lazy } from "solid-js";
import {fetchProducts} from "./components";

function updateTitle(title) {
    document.title = title ?? document.title;
}
async function loadProducts({params}) {
    const {category = ""} = params;
    const {db, products} = await fetchProducts();
    return Object.freeze({category, db, products});
}
const routes = [
    {
        component: lazy(() => import("./pages/home.jsx")),
        load: function() {
            updateTitle("Audiophile Ecommerce");
        },
        path: "/"
    },
    {
        component: lazy(() => import("./pages/checkout.jsx")),
        load: function() {
            updateTitle("Audiophile Checkout");
        },
        path: "/checkout"
    },
    {
        component: lazy(() => import("./pages/category.jsx")),
        load: loadProducts,
        path: "/categories/:category"
    }
];

export default Object.freeze(routes);
