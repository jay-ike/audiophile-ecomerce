import { For, Show, createEffect, createSignal, createResource } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import {
    BrandDescription,
    Categories,
    Footer,
    ItemCounter,
    Header,
    ProductDescription,
    getNavContext
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
    const navigate = useNavigate();
    const [state] = createResource(() => params.id, fetchProduct);
    const [, { addToCart }] = getNavContext();
    const [item, setItem] = createSignal({count: 1});
    const productInfo = function() {
        return {
            cost: state().product?.price,
            id: state().product?.id,
            image: state().product?.image,
            name: state().product?.name
        }
    };
    createEffect(function () {
        if (state.state === "ready" && state().product === undefined) {
            navigate("/404", {replace: true});
        }
    });

    function incrementCount(item) {
        const clone = productInfo();
        clone.count = item.count + 1;
        return clone;
    }

    function decrementCount(item) {
        const clone = utils.clone(item);
        if (clone.count > 0) {
            clone.count = item.count - 1;
        }
        return clone;
    }

    function requestCartAddition() {
        let clone = productInfo();
        clone.count = item().count;
        addToCart(clone);
        clone.count = 0;
        setItem(clone);
    }

    return (
        <>
            <Header></Header>
            <main class={style["product-stack"]}>
                <a href={"/categories/" + (state()?.product?.category ?? "")} class="back-btn capitalize">go back</a>
                <Show when={state()?.product} fallback={<p>loading ...</p>} >
                    <ProductDescription class={style["product-desc"]} isPrimary={true} data={state().product}>
                        <p aria-label={"product price is " + formatter.formatCurrency(state().product.price)}>
                            <strong>{formatter.formatCurrency(state().product.price)}</strong>
                        </p>
                        <div class={style["cart-counter"] + " row"} on:counterincremented={() => setItem(incrementCount)} on:counterdecremented={() => setItem(decrementCount)}>
                            <ItemCounter value={item().count} name={state().product.name} id={state().product.id}></ItemCounter>
                            <button className="btn-primary" onClick={requestCartAddition}>add to cart</button>
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
                    <div className="stack">
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
