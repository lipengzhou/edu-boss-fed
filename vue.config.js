const isProd = process.env.NODE_ENV === 'production'

const cdn = {
  externals: {
    'element-ui': 'ELEMENT',
    vue: 'Vue',
    moment: 'moment'
  },
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/element-ui@2.14.1/lib/index.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js'
  ],
  css: [
    'https://cdn.jsdelivr.net/npm/element-ui@2.14.1/lib/theme-chalk/index.css'
  ]
}

const config = {
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },

  devServer: {
    // 这个代理仅针对 npm run serve 运行的开发服务有效
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true
      }
    }
  },

  chainWebpack: config => {
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },

  configureWebpack: {}
}

if (isProd) {
  config.configureWebpack.externals = cdn.externals
}

module.exports = config
