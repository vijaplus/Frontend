const { i18n } = require('./next-i18next.config.js')
/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n,
  reactStrictMode: true,
  env: {
    API_AUTH: "http://localhost:5000/api/"
  }

}

module.exports = nextConfig
