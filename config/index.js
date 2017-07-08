// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static/linesvr',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    openPath: "/#/10549840601068216320", //对应的商户
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/wxQueue/': {
        // target: 'http://m.zb25.com.cn',
        target: 'http://localhost:8080',
        changeOrigin: true,
        onProxyReq: function (proxyReq, req, res) {
          // proxyReq.setHeader('Cookie', '10888888888888888888=oFS7FjqIuhJSI0jk2ZSh_fYmqOaA'); //
          proxyReq.setHeader('Cookie', '10549840601068216320=oHQU6wI8nofHxSOIbXF51BfsiQzY'); //  集成环境
          // proxyReq.setHeader('Cookie', '10549840601068216320=ous64uJizmxJPi_8yu6VHdB8vCFU');
        },
      },
      '/kq/': {
        target: 'http://m.zb25.com.cn',
        changeOrigin: true,
        onProxyReq: function (proxyReq, req, res) {
          // proxyReq.setHeader('Cookie', '10888888888888888888=oFS7FjqIuhJSI0jk2ZSh_fYmqOaA'); //
          proxyReq.setHeader('Cookie', '10549840601068216320=oHQU6wI8nofHxSOIbXF51BfsiQzY'); //  集成环境
          // proxyReq.setHeader('Cookie', '10549840601068216320=ous64uJizmxJPi_8yu6VHdB8vCFU');
        },
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
