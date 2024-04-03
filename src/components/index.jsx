import { Footer, Logo } from "./footer";
import FeaturedArticle from "./featured-article";
import Categories from "./cathegory";
import Header from "./header";
import { homeAssets } from "./assets.map.jsx";
import BrandDescription from "./brand-description";
import { getNavContext, NavProvider } from "./header.context.jsx";
import ItemCounter from "./item-counter";
import { CheckoutModal, CheckoutSummary } from "./checkout.components.jsx";
import {
    fetchProducts,
    getProductContext,
    ProductsProvider
} from "./products.context.jsx";

export {
    BrandDescription,
    Categories,
    CheckoutModal,
    CheckoutSummary,
    FeaturedArticle,
    Footer,
    ItemCounter,
    Logo,
    Header,
    NavProvider,
    ProductsProvider,
    fetchProducts,
    getNavContext,
    getProductContext,
    homeAssets
};
