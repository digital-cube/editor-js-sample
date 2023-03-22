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
    target: 'https://dev1.impresaone.digitalcube.dev',
    secure: false,
    ws: true,
    changeOrigin: true,
  }
];

module.exports = PROXY_CONFIG;
