module.exports = {
  dev: {
    contentBase: "../",//本地服务器所加载的页面所在的目录
    host: 'localhost',
    port: 8088,
    proxy: {
        '/api': {
            target: 'http://183.134.74.96:8084/bus-management-mobile/',
            secure: false,
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        '/mooc': {
            target:  __dirname + 'bank-eip-mobile/src/mooc/',
            secure: false,
            changeOrigin: true
        },
        '/avatar': {
            target: 'http://test.com:80',
            secure: false,
            changeOrigin: true
        }
    },
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true,
    open: true
  }
}
