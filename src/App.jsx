import styles from './App.module.css';
import {
    BrandDescription,
    Categories,
    FeaturedArticle,
    Footer,
    Header,
    NavProvider,
    homeAssets
} from "./components";

const sectionContents = {
    mainProduct: {
        classValue: styles["main-product"],
        content: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
        heading: "ZX9 SPEAKER",
        image: homeAssets.featuredProduct,
        link: ""
    },
    secondProduct: {
        classValue: styles["product-2"],
        heading: "ZX7 SPEAKER",
        image: homeAssets.speaker,
        link: ""
    }
};

function App() {
    const { hero } = homeAssets;
    return (
        <NavProvider>
            <Header>
                <main class={styles["hero"]}>
                    <img {...hero} />
                    <div class="column">
                        <i>new product</i>
                        <h1>XX99 Mark II
                            <br /> HeadphoneS</h1>
                        <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                        <a href="" class="box">see product</a>
                    </div>
                </main>
            </Header>
            <main class="stack">
                <Categories />
                <FeaturedArticle {...sectionContents.mainProduct}/>
                <FeaturedArticle {...sectionContents.secondProduct}/>
                <BrandDescription />
            </main>
            <Footer />
        </NavProvider>
    );
}

export default App;
