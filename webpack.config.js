const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),

    devtool: 'source-map',

    output: {
        library: 'MiniVideoPlayback',
        libraryExport: "default",
        libraryTarget: 'umd',
        filename: 'mini-video-playback.js',
        umdNamedDefine: true,
        path: path.join(__dirname, 'dist'),
        // @see https://stackoverflow.com/a/49119917
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
