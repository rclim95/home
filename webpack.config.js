const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractVendorCSS = new ExtractTextPlugin("css/vendor.css");
const extractAppCSS = new ExtractTextPlugin("css/app.css");

module.exports = {
    entry: {
        "main": "./src/main.js",
        "vendor": "./src/vendor.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Home &bullet; rclim95.com",
            template: "./src/html/template.html"
        }),
        new CleanWebpackPlugin(["dist"]),
        extractVendorCSS,
        extractAppCSS
    ],
    devServer: {
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/, // Pack .scss file from our app only
                use: extractAppCSS.extract({
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "./assets/"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/, // Pack .css file from node_modules (i.e., 3rd-party vendors)
                use: extractVendorCSS.extract({
                    use: [
                        "css-loader"
                    ]
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "./files/"
                        }
                    }
                ]
            }
        ]
    }
}