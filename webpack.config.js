const path = require('path');

module.exports = {
    entry: {
        settings: "./client/src/pages/ratings-settings/index.tsx"
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./client/dist"),
        filename: '[name]-bundle.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/},
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}