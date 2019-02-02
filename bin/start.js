const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const addEntries = require('webpack-dev-server/lib/utils/addEntries');
const createDomain = require('webpack-dev-server/lib/utils/createDomain');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');
const { colors, status, bonjour } = require('webpack-dev-server/bin/utils');

const mergeConfigs = require('./mergeConfigs');
const config = mergeConfigs();

const options = Object.assign({}, config.devServer, {
    stats: {
        colors: true
    },
    open: true,
    inline: true,
    port: 8080,
    host: 'localhost',
    publicPath: '/'
});

const compiler = webpack(config);

const signals = ['SIGINT', 'SIGTERM'];

signals.forEach((signal) => {
    process.on(signal, () => {
        if (server) {
            server.close(() => process.exit());
        } else {
            process.exit();
        }
    });
});

const log = createLogger(options);

addEntries(config, options);

const server = new WebpackDevServer(compiler, options, log);

server.listen(options.port, options.host, (err) => {
    if (err) {
        throw err;
    }

    const uri = createDomain(options, server.listeningApp);

    status(uri, options, log, true);
});