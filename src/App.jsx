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

function App() {
    const { hero } = homeAssets;
    return (
        <NavProvider>
            <Header>
                <main class={styles["hero"]}>
                    <img src={hero.source} alt={hero.alt} width={hero.width} height={hero.height} />
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
                <FeaturedArticle classValue={styles["f-product"]} />
                <BrandDescription />
            </main>
            <Footer />
        </NavProvider>
    );
}

export default App;
