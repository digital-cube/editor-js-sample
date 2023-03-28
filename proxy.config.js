const PROXY_CONFIG = [
  {
    context: [
      "/user/**",
      "/api/**",
      '/tcapi/**',
      "/upl/**",
      '/tcstorage/**',
      "/devupl/**",
    ],
    target: 'http://localhost:8800',
    secure: false,
    ws: true,
    changeOrigin: true,
  }
];

module.exports = PROXY_CONFIG;
