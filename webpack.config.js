const htmlPlugin = require("html-webpack-plugin");
const miniCSSPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                use: [{
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ],
    },
    plugins: [
        new htmlPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new miniCSSPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}