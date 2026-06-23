// PM2 process config for the SEO runtime service.
//   pm2 start server/ecosystem.config.cjs
//   pm2 save && pm2 startup   (to survive reboots)
module.exports = {
  apps: [
    {
      name: 'fyreway-seo',
      script: 'index.mjs',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '200M',
      env: {
        SEO_PORT: '3001',
        DIST_DIR: '/home/vpn-sales-landing-page/dist',
        SITE_URL: 'https://fyreway.com',
        SITE_NAME: 'FyreWay',
        VITE_INFRASTRUCTURE_API_BASE_URL: 'https://infra-api-prod.fyreway.com',
      },
    },
  ],
};
