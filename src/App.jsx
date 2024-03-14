import logo from './logo.svg';
import styles from './App.module.css';
import { Categories, FeaturedArticle, Footer } from "./components";

function App() {
    return (
        <>
            <header class={styles.header}>
                <img src={logo} class={styles.logo} alt="logo" />
                <p>
                    Edit <code>src/App.jsx</code> and save to reload.
                </p>
                <a
                    class={styles.link}
                    href="https://github.com/solidjs/solid"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Solid
                </a>
            </header>
            <main class="stack">
                <Categories />
                <FeaturedArticle classValue={styles["f-product"]} />
            </main>
            <Footer />
        </>
    );
}

export default App;
