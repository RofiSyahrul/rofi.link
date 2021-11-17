module.exports = {
  appName: 'rofi.link',
  appURL: process.env.APP_URL || `http://localhost:${process.env.PORT}`,
  manifest: {
    themeColor: '#0e7490',
    backgroundColor: '#f4f4f5',
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
