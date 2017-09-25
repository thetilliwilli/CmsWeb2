module.exports = {
  apps: [
    {
      name: 'CmsApi',
      script: 'server.js',
      env: {},
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      key: `Private/id_rsa`,
      user: 'root',
      host: '95.213.248.123',
      ref: 'origin/master',
      repo: 'https://github.com/thetilliwilli/CmsWeb2.git',
      path: '/opt/CmsWeb2',
      "post-deploy": "webpack && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};