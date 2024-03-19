import homeEarphone from "../assets/images/earphone.png?format=webp&as=metadata&w=79";
import homeSpeaker from "../assets/images/zx9-speaker.png?format=webp&as=metadata&w=84;175";
import homeHeadpone from "../assets/images/headphone.png?format=webp&as=metadata&w=79";
import newProduct from "../assets/images/headphone-banner.png?format=webp&as=metadata&w=327&fit=cover";
import brand from "../assets/images/description-image.png?format=webp&as=metadata&w=327&lossless=true";
import sectionSpeaker from "../assets/images/section-speaker.png?format=webp&as=metadata&w=325";
import sectionEarphone from "../assets/images/section-earphone.png?format=webp&as=metadata&w=327";


function propertiesPicker(props) {
    return function (obj) {
        return Object.entries(obj).filter(
            ([entry]) => props.includes(entry)
        ).reduce(function (acc, [key, val]) {
            acc[key] = val;
            return acc;
        }, Object.create(null));
    };
}

const pick = propertiesPicker(["src", "width", "height"]);

export const categoryAssets = Object.freeze({
    headphones: Object.assign(pick(homeHeadpone), {
        alt: "a black headphone branded K240 with a golden design on the microphone support",
        link: ""
    }),
    speakers: Object.assign(pick(homeSpeaker[0]), {
        alt: "a black speaker branded Stein Music with 2 sound outputs of equal sizes",
        link: ""
    }),
    earphones: Object.assign(pick(homeEarphone), {
        alt: "a black and circular earphone cover with a semi-circular opener",
        link: ""
    }),
});

export const homeAssets = Object.freeze({
    brand: Object.assign(pick(brand), {
        alt: "a white young man sitting on a café and relaxing with music",
    }),
    earphone: Object.assign(pick(sectionEarphone), {
        alt: "a pair of black earphones plugged in their charger"
    }),
    featuredProduct: Object.assign(pick(homeSpeaker[1]), {
        alt: categoryAssets.speakers.alt
    }),
    hero: Object.assign(pick(newProduct), {
        alt: "a black headphone with black leather on both sound outputs having controls on both sides",
    }),
    speaker: Object.assign(pick(sectionSpeaker), {
        alt: "a black speacker with a big sound output on the bottom and a small one on the top placed on top of a chair"
    })
});
