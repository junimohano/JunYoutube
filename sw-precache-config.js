module.exports = {
    staticFileGlobs: [
        'dist/JunYoutube/**.html',
        'dist/JunYoutube/**.js',
        'dist/JunYoutube/**.css',
        'dist/JunYoutube/assets/icons/*'
    ],
    root: 'dist/JunYoutube',
    stripPrefix: 'dist/JunYoutube/',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /api\.azurewebsites\.net/,
        handler: 'networkFirst'
    }]
};
