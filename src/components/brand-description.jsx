import {homeAssets} from "./index.jsx";
function BrandDescription() {
    const {brand} = homeAssets;
    return (
        <section class="branding column">
            <img {...brand} />
            <div class="stack">
                <h3>Bringing you the <i>best</i> audio gear</h3>
                <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
            </div>
        </section>
    );
}

export default BrandDescription;
