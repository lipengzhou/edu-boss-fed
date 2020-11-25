/* eslint-disable */
const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

// 托管了 dist 目录，当访问 / 的时候，默认会返回托管目录中的 index.html 文件
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/api/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/': ''
  }
}))

app.use('/api/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/': ''
  }
}))

const port = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Test server is running at http://localhost:${port}`)
})
