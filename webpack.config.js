const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/client/app.ts",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist", "client")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: "/node_modules/",
                options: {
                    configFile: "tsconfig.client.json"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.png$/,
                type: "asset/resource",
                generator: {
                    filename: 'assets/[hash][ext][query]'
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Home &bullet; rclim95.com",
            // NOTE: Using html-loader so that any references defined in the index.html will get
            // resolved by webpack, e.g., image assets.
            template: "!!html-loader!./src/client/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ]
};