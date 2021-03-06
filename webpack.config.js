const path = require('path');
const webpack = require('webpack');
const ngToolsWebpack = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let postcssLoader = {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
            require('autoprefixer')({browsers: 'last 3 Chrome versions'}),
        ],
    },
};

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: './bundle.[name].js',
        library: '[name]',
        libraryTarget: "var"
    },
    resolve: {
        modules: [
            "../node_modules",
        ],
        extensions: [
            '.ts',
            '.js',
            '.html',
            '.scss',
        ],
        alias: {
            "lib": path.resolve('./lib'),
        }
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders'),
        ],
    },
    module: {
        rules: [
            { test: /.ts$/, use: '@ngtools/webpack' },
            { test: /\.css$/,  use: 'raw-loader' },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ],
            },
            {test: /\.(png|ico|gif)$/, loader: "file-loader?name=bundle.[name].[ext]"}
        ]
    },
    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.json',
            skipMetadataEmit: true,
            entryModule: 'src/app/app.module#AppModule',
        }),
        new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            filename: "bundle.html",
        }),
    ]
};