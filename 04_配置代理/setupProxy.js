const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api1',  // 遇见/api1前缀的请求，就会触发该代理配置
        createProxyMiddleware({
            target: 'http://localhost:5000',  // 请求转发给谁
            changeOrigin: true,  // 控制服务器收到的请求头中Host字段的值
            pathRewrite: {
                '^/api1': ''
            }   // 重写请求路径（必须）
        })
    );
    app.use(
        '/api2',
        createProxyMiddleware({
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {
                '^/api2': ''
            }
        })
    )
};


// 简写方式，通过封装函数+数组统一管理配置
// const proxyList = [
//     { path: '/api1', target: 'http://localhost:5000' },
//     { path: '/api2', target: 'http://localhost:5001' },
// ];

// function createProxy(app, { path, target }) {
//     app.use(
//         path,
//         createProxyMiddleware({
//             target,
//             changeOrigin: true,
//             pathRewrite: {
//                 [`^${path}`]: ''
//             }
//         })
//     );
// }

// module.exports = function (app) {
//     proxyList.forEach(proxy => createProxy(app, proxy));
// };