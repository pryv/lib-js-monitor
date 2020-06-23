const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		'pryv-monitor': './src/browser-index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'examples/index.html', to: 'index.html' },
			],
		}),
	],
	devtool: 'source-map'
};