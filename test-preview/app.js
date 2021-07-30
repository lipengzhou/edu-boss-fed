/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(express.static('./dist')) // 托管静态资源，访问 / 默认会查找静态目录中的 index.html
app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))
app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(3000, () => {
  console.log('running at http://localhost:3000/')
})
