const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode : "development",
	entry : "./app/main.js",
	output : {
		filename : "all.js" ,
		publicPath : "xuni"
	},
	module : {
		rules : [
			{
				test : /\.vue$/,
				loader : "vue-loader"
			},
			//https://www.npmjs.com/package/less-loader
			{
	            test: /\.less$/,
	            use: [
		            {
		                loader: "style-loader"
		            }, 
		            {
		                loader: "css-loader"
		            }, 
		            {
		                loader: "less-loader"
		            }
	            ]
	        }
		]
	},
	//https://vue-loader.vuejs.org/guide/
	plugins: [
		new VueLoaderPlugin()
	],
	//https://cn.vuejs.org/v2/guide/installation.html
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	//https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	}
}