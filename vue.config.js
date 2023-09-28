const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const cesiumSource = './node_modules/cesium/Source'


module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/projectName/" : "/",
    configureWebpack:{
        output:{
            sourcePrefix: ''
        },
        amd:{
            toUrlUndefined: true // webpack在cesium中能友好的使用require
        },
        resolve:{
            extensions: ['.js', '.vue', '.json'],
            alias:{
                'cesium': path.resolve(__dirname, cesiumSource) // 3 定义别名cesium后，cesium代表了cesiumSource的文件路径，此处配置好后，就在main.js中直接使用cesium引入资源 
            }
        },
        plugins:[
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
            new webpack.DefinePlugin({ 
                CESIUM_BASE_URL: JSON.stringify('./')  
            })
        ],
        module:{
            unknownContextRegExp: /^.\/.*$/,
            unknownContextCritical: false,
        }
    }
}