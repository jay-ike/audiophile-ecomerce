import { For } from "solid-js";
import { Logo } from "./footer";
import assets from "../assets/icons.svg?url";

function getPageState(current, given) {
    if (current === given) {
        return { "aria-current": "page" };
    }
    return {};
}
function Header(props) {
    const links = ["home", "headphones", "speakers", "earphones"];
    return (
        <header>
            <nav class="row box">
                <button aria-label="open the menu" class="xl-remove no-padding">
                    <svg width="24" height="24">
                        <title>hamburger menu</title>
                        <use href={assets + "#hamburger"} />
                    </svg>
                </button>
                <Logo />
                <ul class="row xl-show" role="list">
                    <For each={links}>
                        {
                            (link) => (
                                <li><a href="" {...getPageState(props.currentPage ?? "home", link)}>{link}</a></li>
                            )
                        }
                    </For>
                </ul>
                <a href="" data-cart="empty">
                    <svg width="24" height="24">
                        <use href={assets + "#cart"} />
                    </svg>
                </a>
            </nav>
        </header>
    );
}

export default Header;
