const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),

    devtool: 'source-map',

    output: {
        library: 'MiniVideoPlayback',
        libraryTarget: 'umd',
        filename: 'mini-video-playback.js',
        umdNamedDefine: true,
        path: path.join(__dirname, 'lib')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }],
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
