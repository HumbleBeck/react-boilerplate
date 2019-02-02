const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const installDir = process.env.INIT_CWD;

//Copy all src files
fse.copySync('src', path.join(installDir, 'src'), {
    overwrite: false
});

//Add package.json commands
const packageJSONPath = path.join(installDir, 'package.json');
const rb = path.resolve('react-boilerplate');
const bin = `./node_modules/${process.env.npm_package_name}/bin`;

const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath));

packageJSON.scripts = Object.assign({}, packageJSON.scripts, {
    'start': `node ${path.join(bin, 'start.js')}`,
    'build:prod': `node ${path.join(bin, 'start.js ')} --config webpack.prod.js`,
    'build:dev': `node ${path.join(bin, 'start.js ')} --config webpack.dev.js`
});

fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON));

//Add .babelrc
const babelRCPath = path.join(installDir, '.babelrc');

const thisBabelRC = JSON.parse(fs.readFileSync('.babelrc'));
let thatBabelRC = {};
if (fs.existsSync(babelRCPath)) {
    thatBabelRC = JSON.parse(fs.readFileSync(babelRCPath));
}

const newBabelRC = Object.assign({}, thatBabelRC, thisBabelRC);
fs.writeFileSync(babelRCPath, JSON.stringify(newBabelRC));

//.env.example
fs.copyFileSync('.env.example', path.join(installDir, '.env.example'));



