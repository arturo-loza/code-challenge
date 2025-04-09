const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const package = require("./package.json");
const commonPaths = require("./build_utils/config/commonPaths");

const isDebug = !process.argv.includes("release");

const port = process.env.PORT || 3000;

module.exports = {
    entry: commonPaths.entryPath,
    output: {
        uniqueName: package.name,
        publicPath: "/",
        path: commonPaths.outputPath,
        filename: `${package.version}/js/[name].[chunkhash:8].js`,
        chunkFilename: `${package.version}/js/[name].[chunkhash:8].js`,
        assetModuleFilename: isDebug
            ? `images/[path][name].[contenthash:8][ext]`
            : `images/[path][contenthash:8][ext]`,
        crossOriginLoading: "anonymous",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        port: port,
        static: {
            directory: commonPaths.outputPath,
        },
        historyApiFallback: {
            index: "index.html",
        },
        webSocketServer: false,
    },
};
