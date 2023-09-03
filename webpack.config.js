import path from "path";

const config = {
    entry: "./app/index.js",
    output: {
        filename: "main.js",
        path: path.resolve("./", "./app/dist"),
    },
    experiments: { topLevelAwait: true },
    watch: true,
    mode: "development"
};

export default config;
