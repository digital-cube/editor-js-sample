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
    target: 'https://thilo.services',
    secure: false,
    ws: true,
    changeOrigin: true,
  }
];

module.exports = PROXY_CONFIG;
