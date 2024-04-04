import { lazy } from "solid-js";

function updateTitle(title) {
    document.title = title ?? document.title;
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
        path: "/categories/:category"
    },
    {
        component: lazy(() => import("./pages/product.jsx")),
        path: "/product/:id"
    }
];

export default Object.freeze(routes);
