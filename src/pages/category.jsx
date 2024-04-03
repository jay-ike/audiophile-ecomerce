import { Show, For, createResource } from "solid-js";
import {
    Categories,
    BrandDescription,
    Footer,
    Header,
    ProductDescription
} from "../components";
import style from "../assets/styles/product.module.css";

function CategoriesPage(props) {
    const [pageData] = createResource(getPageData);


    function getPageData() {
        return props.data;
    }
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
                <Show when={Array.isArray(pageData()?.products)} fallback={<p>loading...</p>}>
                    <For each={pageData().products.filter(
                        (product) => product.category === pageData().category
                    ).sort(productComparator)
                    }>
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
