import { Show } from "solid-js"

function FeaturedArticle(props) {
    return (
        <article class={(props.classValue ?? "") + " box column"}>
            <img {...props.image} />
            <div class="stack">
                <h2>{props.heading}</h2>
                <Show when={props.content}>
                    <p>{props.content}</p>
                </Show>
                <a href={props.link} class="box">see product</a>
            </div>
        </article>
    );
}

export default FeaturedArticle;
