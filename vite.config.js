import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";
import {imagetools} from "vite-imagetools";

export default Object.freeze(defineConfig({
    build: {
        target: "esnext"
    },
    plugins: [
        solidPlugin(),
        imagetools(),
    ],
    server: {
        port: 3000
    }
}));
