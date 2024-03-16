import homeEarphone from "../assets/images/earphone.png";
import homeSpeaker from "../assets/images/zx9 speaker.png";
import homeHeadpone from "../assets/images/headphone.png";
import newProduct from "../assets/images/headphone-banner.png";



export const categoryAssets = Object.freeze({
    headphones: {
        source: homeHeadpone,
        alt: "a black headphone branded K240 with a golden design on the microphone support",
        width: 79,
        height: 104,
        link: ""
    },
  speakers: {
        source: homeSpeaker,
        alt: "a black speaker branded Stein Music with 2 sound outputs ",
        width: 84,
        height: 101,
        link: ""
    },
  earphones: {
        source: homeEarphone,
        alt: "a black and circular earphone cover with a semi-circular opener",
        width: 79,
        height: 104,
        link: ""
    },

});

export const homeAssets = Object.freeze({
    hero: {
        source: newProduct,
        alt: "a black headphone with black leather on both sound outputs having controls on both sides",
        width: 375,
        height: 463,
    }
});
