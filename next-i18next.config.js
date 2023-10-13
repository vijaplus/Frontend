

// @ts-check
/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'vi'],
  },
  localePath:
  typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/locales',
}