const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');


module.exports = (mode = 'development') => {
    let common = {};
    let config = {};
    if (mode === 'production') {
        common = require('../webpack.prod');
    } else {
        common = require('../webpack.dev');
    }

    if (fs.existsSync(path.join(process.cwd(), 'webpack.config.js'))) {
        config = require(path.join(process.cwd(), 'webpack.config.js'));
    }

    return merge(common, config);
}