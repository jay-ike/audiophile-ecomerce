import { For, Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import {
    BrandDescription,
    Categories,
    Footer,
    ItemCounter,
    Header,
    ProductDescription
} from "../components";
import utils from "../utils";
import style from "../assets/styles/product.module.css";

const formatter = utils.getFormatter();

async function fetchProduct(id) {
    const { db, products } = await utils.fetchProducts();
    return Object.freeze({
        db,
        product: products.filter((prod) => prod.id === id)[0],
        relateds: utils.getRelatedProducts(products, id)
    });
}

function ProductPage() {
    const params = useParams();
    const [state] = createResource(() => params.id, fetchProduct);
    return (
        <>
            <Header></Header>
            <main class="stack">
                <Show when={state()?.product} fallback={<p>loading ...</p>} >
                    <ProductDescription class={style["product-desc"]} isPrimary={true} data={state().product}>
                        <p aria-label={"product price is " + formatter.formatCurrency(state().product.price)}>
                            <strong>{formatter.formatCurrency(state().product.price)}</strong>
                        </p>
                        <div class={style["cart-counter"] + " row"}>
                            <ItemCounter></ItemCounter>
                            <button className="btn-primary">add to cart</button>
                        </div>
                    </ProductDescription>
                    <div className={style["p-feat"] + " column"}>
                        <div className="stack contain">
                            <h2>features</h2>
                            <For each={state().product.features ?? []}>
                                {
                                    (feature) => (
                                        <p>{feature}</p>
                                    )
                                }
                            </For>
                        </div>
                        <div className="stack contain">
                            <h2>in the box</h2>
                            <ul class="stack addon" role="list">
                                <For each={state().product.addons ?? []}>
                                    {
                                        (addon) => (
                                            <li class="row">
                                                <span aria-label={addon.quantity}>{addon.quantity}X</span>
                                                <span>{addon.name}</span>
                                            </li>
                                        )
                                    }
                                </For>
                            </ul>
                        </div>
                    </div>
                    <div className={"column " + style["p-preview"]}>
                        <For each={state().product.previews ?? []}>
                            {
                                (preview) => (
                                    <img {...utils.copy(preview).updateAttributes({ url: "src" })} />
                                )
                            }
                        </For>
                    </div>
                    <h3>you may also like</h3>
                    <div className={style["p-related"] + " row"}>
                        <For each={state().relateds}>
                            {
                                (product) => (
                                    <div>
                                        <div className="img-box">
                                            <img {...utils.copy(product.image).updateAttributes({ url: "src" })} />
                                        </div>
                                        <h4>{product.name}</h4>
                                        <a href={"/product/" + product.id} className="btn-primary">see product</a>
                                    </div>
                                )
                            }
                        </For>
                    </div>
                </Show>
                <Categories class="xl-show s-gap-xl" />
                <BrandDescription />
            </main>
            <Footer></Footer>
        </>
    );
}

export default ProductPage;
