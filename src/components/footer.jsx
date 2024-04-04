import sprites from "../assets/icons.svg?url";

function Logo() {
    return (
        <svg width="143" height="25">
            <title>Audiophile Logo</title>
            <use href={sprites + "#logo"} />
        </svg>
    );
}
function Footer() {
    return (
        <footer>
            <Logo />
            <ul class="column" role="list">
                <li><a href="">home</a></li>
                <li><a href="">headphones</a></li>
                <li><a href="">speakers</a></li>
                <li><a href="">earphones</a></li>
            </ul>
            <p>
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
            </p>
            <p class="capitalize">copyright 2024. all rights allowed.</p>
            <ul class="row" role="list">
                <li>
                    <a href="" aria-label="follow us on Github">
                        <svg width="24" height="24">
                            <title>Github Logo</title>
                            <use href={sprites + "#github"} />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" aria-label="follow us on Mastodon">
                        <svg width="24" height="24">
                            <title>Mastodon Logo</title>
                            <use href={sprites + "#mastodon"} />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" aria-label="follow us on Twitter">
                        <svg width="24" height="24">
                            <title>X formerly Twitter Logo</title>
                            <use href={sprites + "#twitter"} />
                        </svg>
                    </a>
                </li>
            </ul>
        </footer>
    );
}
export { Footer, Logo };
