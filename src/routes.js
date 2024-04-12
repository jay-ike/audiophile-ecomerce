import { lazy } from "solid-js";

const allowedCategories = ["headphone", "speaker", "earphone"];
function updateTitle(title) {
    document.title = title ?? document.title;
}
const routes = [
    {
        component: lazy(() => import("./pages/home.jsx")),
        load: function () {
            updateTitle("Audiophile Ecommerce");
        },
        path: "/"
    },
    {
        component: lazy(() => import("./pages/checkout.jsx")),
        load: function () {
            updateTitle("Audiophile Checkout");
        },
        path: "/checkout"
    },
    {
        component: lazy(() => import("./pages/category.jsx")),
        matchFilters: {
            category: (val) => allowedCategories.includes(val)
        },
        path: "/categories/:category"
    },
    {
        component: lazy(() => import("./pages/product.jsx")),
        path: "/product/:id"
    },
    {
        component: lazy(() => import("./pages/404.jsx")),
        path: "*"
    }
];

export default Object.freeze(routes);
