import sprites from "../assets/icons.svg?url";
function Footer() {
    return (
        <footer>
            <svg width="143" height="25">
                <title>Audiophile Logo</title>
                <use href={sprites + "#logo"} />
            </svg>
            <ul class="column" role="list">
                <li><a href="">home</a></li>
                <li><a href="">headphones</a></li>
                <li><a href="">speakers</a></li>
                <li><a href="">earphones</a></li>
            </ul>
            <p>
                Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
            </p>
            <p>copyright 2024. all rights reserved</p>
            <ul class="row" role="list">
                <li>
                    <a href="" aria-label="follow us on Facebook">
                        <svg width="24" height="24">
                            <title>Facebook Logo</title>
                            <use href={sprites + "#facebook"} />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" aria-label="follow us on Twitter">
                        <svg width="24" height="24">
                            <title>Twitter Logo</title>
                            <use href={sprites + "#twitter"} />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" aria-label="follow us on Instagram">
                        <svg width="24" height="24">
                            <title>Instagram Logo</title>
                            <use href={sprites + "#instagram"} />
                        </svg>
                    </a>
                </li>
            </ul>
        </footer>
    );
}
export default Footer;
