import styles from "../assets/styles/App.module.css";
import {
    BrandDescription,
    Categories,
    FeaturedArticle,
    Footer,
    Header,
    homeAssets
} from "../components";

const sectionContents = {
    mainProduct: {
        classValue: styles["main-product"],
        content: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
        heading: "ZX9 SPEAKER",
        image: homeAssets.featuredProduct,
        link: "/product/853262f1-024e-4275-9141-936bef98cabb"
    },
    secondProduct: {
        classValue: styles["product-2"],
        heading: "ZX7 SPEAKER",
        image: homeAssets.speaker,
        link: "/product/6f7c56a5-3b57-4036-8205-f22e9d90d60e"
    },
    thirdProduct: {
        classValue: styles["third-product"],
        heading: "yx1 earphones",
        image: homeAssets.earphone,
        link: "/product/6ce8a43d-0e8d-466d-9364-794cc0d382b7"
    }
};

function App() {
    const { hero } = homeAssets;
    return (
        <>
            <Header>
            </Header>
            <main class="stack">
                <header class={styles["hero"]} role='banner'>
                    <img {...hero} />
                    <div class="column">
                        <i>new product</i>
                        <h1>XX99 Mark II
                            <br /> HeadphoneS</h1>
                        <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                        <a href="/product/51491bae-0c7e-4e9b-a032-b45786ca644b" class="box">see product</a>
                    </div>
                </header>
                <Categories class="xl-show"/>
                <FeaturedArticle {...sectionContents.mainProduct} />
                <FeaturedArticle {...sectionContents.secondProduct} />
                <FeaturedArticle {...sectionContents.thirdProduct} />
                <BrandDescription />
            </main>
            <Footer />
        </>
    );
}

export default App;
