/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''
  if (req.url.includes('/api/front')) {
    target = 'http://edufront.lagou.com/'
  } else if (req.url.startsWith('/api/boss')) {
    target = 'http://eduboss.lagou.com/'
  }
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api/': ''
    }
  })(req, res)
}
