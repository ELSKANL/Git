module.exports = {
	//项目入口文件
	entry:"./js/index.js",
	output:{
		path:__dirname+"/dist",
		filename:"bundle.js"
	},
	 module : {
        loaders : [
            {test : /\.css$/, loader : "style-loader!css-loader"},
            	//处理图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2048, // 小于2kb的图片处理成base64
                    name: 'img/[name].[ext]',
                    publicPath:"./dist/"
                }
            }
        ]
    }
}