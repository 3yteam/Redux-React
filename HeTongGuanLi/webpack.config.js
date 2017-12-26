var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname,"build");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var node_modules = path.resolve(__dirname, 'node_modules');
var CleanWebpackPlugin = require('clean-webpack-plugin');  //清空文件夹里的文件
var basePath = path.join(__dirname, 'static');

var devServerPath='/',
    commonOptions={},
    webpackdevServer='',
    plugins=[],
    outFilename='[name].js';

var webJs= path.join(basePath, 'js'),
    webImage = path.join(basePath, 'images'),
    webStyle = path.join(basePath, 'css');

var NODE_ENV=process.env.NODE_ENV;

if(NODE_ENV=='production') {
    outFilename="[name].[chunkhash].js";
    outputPath=path.join(basePath, 'prod'); //打包文件路径
    plugins.push(new ExtractTextPlugin("[name].[chunkhash].css"));
    commonOptions.postcss = [
        require('autoprefixer')({
            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
    ];
    var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); //压缩js，提高压缩速度
    plugins.push(new ParallelUglifyPlugin({
        cacheDir: outputPath+'/.cache/',
        uglifyJS:{
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }
    }));
    //打包之前先删除打包文件里的文件方便重新打包
    plugins.push(new CleanWebpackPlugin(['prod'], {
        root: basePath,
        verbose: true,
        dry: false,
        watch:true,
        exclude: ['plugins']
    }));
} else if(NODE_ENV=='dev') {

    plugins.push(new ExtractTextPlugin("[name].css"));
    //开发环境
    plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackdevServer={
        contentBase: basePath,
        historyApiFallback: true,
        hot: true,
        devtool: 'eval',
        host: '0.0.0.0',
        port: 3008,
        inline: true,
        noInfo: false,
        stats: {
            chunks: false,
            colors: true
        }
    };

}
var config = {
    //入口文件配置
    entry:{
        index:path.resolve(webJs,'index.jsx')
      },
    //文件导出的配置
    output:{
        path:buildPath,
        filename:"[name].js",
        publicPath:'/build/'
    },
    devServer:{
            contentBase: '',  //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
            // 这里地址不能用buildPath，因为build文件里没有index.html文件，页面找不到
            devtool: 'eval',
            hot: true,        //自动刷新
            inline: true,    
            port: 3005        
     },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: ['babel'],
            exclude: /node_modules/
            //排除不处理的目录
        }, 
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['url?limit=3072&name=images/[hash:8].[name].[ext]']
        }]

    },
    resolve:{
        extensions: ['', '.js', '.jsx'],
        alias: {
            webJs:webJs,
            webImage:webImage,
            webStyle:webStyle
        }
    },
    postcss: [
      require('autoprefixer')({
         browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
      })
    ],
    plugins: [
        //  //【2】注意这里  这两个地方市用来配置common.js模块单独打包的
        //  new webpack.optimize.CommonsChunkPlugin({
        //     name: ['jquery'],
        //     minChunks:Infinity,
        //     filename: "jquery.js"
        // }),
         new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          'window.$':"jquery"
        }),
         new ExtractTextPlugin("[name].css"),
         new webpack.HotModuleReplacementPlugin()
         //压缩打包的文件
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.AggressiveMergingPlugin(),
         //允许错误不打断程序
        // new webpack.NoErrorsPlugin()
    ]
}

module.exports = config;