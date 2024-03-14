import image from "../assets/images/zx9 speaker.png";

function FeaturedArticle(props) {
    return (
        <article class={ (props.classValue ?? "") + " box column"}>
            <img src={image} width="172" height="207" alt="a black speaker branded stein music with 2 sound outputs " />
            <div class="stack">
                <h2>ZX9 SPEAKER</h2>
                <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
                <a href="" class="box">see product</a>
            </div>
        </article>
    );
}

export default FeaturedArticle;
