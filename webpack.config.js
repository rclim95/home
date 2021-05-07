const path = require("path");
<<<<<<< HEAD
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

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
        new UglifyJSPlugin(),
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
                            publicPath: "/",
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
                            publicPath: "/",
                            outputPath: "./fonts/"
                        }
                    }
                ]
            }
        ]
    }
}
=======
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");


// We're exporting multiple configurations: one for the client, and the other for the server
// https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
//
// NOTE: We're also making module.exports work with a function instead. This is so we can access
// the "env" parameter for determining if we're building for production or not. For more information:
// https://webpack.js.org/guides/environment-variables/
module.exports = env => {
    const PRODUCTION = env.PRODUCTION;

    return [
        {
            name: "client",
            entry: "./src/client/app.ts",
            devtool: PRODUCTION ? "source-map" : "inline-source-map",
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        loader: "ts-loader",
                        exclude: /node_modules/,
                        options: {
                            configFile: "tsconfig.server.json"
                        }
                    },
                    {
                        test: /\.(png|jpg)/,
                        type: "asset/resource"
                    },
                    {
                        test: /\.html$/,
                        use: "html-loader"
                    },
                    {
                        test: /\.(scss)$/,
                        use: [
                            { loader: MiniCssExtractPlugin.loader },
                            { loader: "css-loader" },
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "autoprefixer"
                                        ]
                                    }
                                }
                            },
                            { loader: "sass-loader" }
                        ]
                    }
                ]
            },
            resolve: {
                extensions: [".ts", ".js"]
            },
            plugins: [
                new MiniHtmlWebpackPlugin({
                    filename: "index.html",
                    context: {
                        title: "Home &bullet; rclim95's Home",
                        head: `
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />`
                    }
                }),
                new MiniCssExtractPlugin()
            ],
            output: {
                filename: "app.js",
                path: path.resolve(__dirname, "dist", "client")
            }
        },
        {
            name: "server",
            entry: "./src/server/app.ts",
            devtool: PRODUCTION ? "source-map" : "inline-source-map",
            target: "node",
            externals: [
                // Avoid bundling modules that are in node_modules, as node will resolve them
                nodeExternals()
            ],
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        loader: "ts-loader",
                        exclude: /node_modules/,
                        options: {
                            configFile: "tsconfig.server.json"
                        }
                    }
                ]
            },
            resolve: {
                extensions: [".ts"]
            },
            output: {
                filename: "app.js",
                path: path.resolve(__dirname, "dist", "server")
            }
        }
    ];
};
>>>>>>> wip/webpack-5
