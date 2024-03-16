import styles from './App.module.css';
import { Categories, FeaturedArticle, Footer, Header } from "./components";

function App() {
    return (
        <>
            <Header />
            <main class="stack">
                <Categories />
                <FeaturedArticle classValue={styles["f-product"]} />
            </main>
            <Footer />
        </>
    );
}

export default App;
