const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Home &bullet; rclim95.com"
        }),
        new CleanWebpackPlugin(["dist"])
    ],
    devServer: {
        contentBase: "./dist"
    }
}