module.exports = {
  appName: 'rofi.link',
  appURL: process.env.APP_URL,
  manifest: {
    themeColor: '#164e63',
    backgroundColor: '#7dd3fc',
    description: 'Singkat tautan dengan mudah',
    icon: {
      main: ['192x192', '384x384'],
      msTile: {
        '70x70': 'square',
        '144x144': 'square',
        '150x150': 'square',
        '310x310': 'square',
        '310x150': 'wide'
      }
    }
  }
};
