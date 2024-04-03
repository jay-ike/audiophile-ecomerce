import { Show, For, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import {
    Categories,
    BrandDescription,
    Footer,
    Header,
    ProductDescription
} from "../components";
import style from "../assets/styles/product.module.css";
import utils from "../utils";

async function loadProducts(category) {
    const { db, products } = await utils.fetchProducts();
    return Object.freeze({
        db,
        products: products.filter((product) => product.category === category)
    });
}

function CategoriesPage() {
    const params = useParams();
    const [pageData] = createResource(() => params.category, loadProducts);

    function productComparator(val1, val2) {
        if (val1["new-product"]) {
            return -1;
        }
        if (val2["new-product"]) {
            return 1;
        }
        return 0;
    }

    return (
        <>
            <Header></Header>
            <main class="stack">
                <header className="box banner contain" role="banner">
                    <h1>{params.category + "s"}</h1>
                </header>
                <Show when={Array.isArray(pageData()?.products)} fallback={<p>loading...</p>}>
                    <For each={pageData().products.sort(productComparator)}>
                        {
                            (product) => (
                                <ProductDescription class={style["product-desc"]} data={product}>
                                    <a href={"/product/" + product.id} className="btn-primary">see product</a>
                                </ProductDescription>
                            )
                        }
                    </For>
                </Show>
                <Categories class="xl-show" />
                <BrandDescription />
            </main>
            <Footer />
        </>
    );
}

export default CategoriesPage;
