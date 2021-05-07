const path = require("path");
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