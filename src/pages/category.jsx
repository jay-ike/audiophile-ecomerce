import { Show, For, createResource } from "solid-js";
import {
    Categories,
    BrandDescription,
    Footer,
    Header,
} from "../components";


function CategoriesPage(props) {
    const [pageData] = createResource(getPageData);


    function getPageData() {
        return props.data;
    }

    return (
        <>
            <Header></Header>
            <main class="stack">
                <Show when={Array.isArray(pageData()?.products)} fallback={<p>loading...</p>}>
                    <For each={pageData().products.filter((product) => product.category === pageData().category)}>
                        {
                            (product) => (
                                <p>{product.name}</p>
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
