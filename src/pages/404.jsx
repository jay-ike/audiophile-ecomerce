import { Header, Footer } from "../components";
import illustration from "../assets/404-illustration.svg";

function NotFoundPage() {
    return (
        <>
            <Header></Header>
            <main class="column not-found">
                <div class="stack">
                    <h1>aww snap. <br />page not found</h1>
                    <p>Don't know why but it looks like the page you're searching does not exist. Anyway you can still  use our navigation to browse the website</p>
                    <a href="/" class="btn-primary">go home</a>
                </div>
                <img width="375" height="380" alt="an illustration of a young man angry because his headphone is broken" src={illustration} />
            </main>
            <Footer></Footer>
        </>
    );
}
export default NotFoundPage;
