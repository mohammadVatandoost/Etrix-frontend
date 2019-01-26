require('babel-register');

const router = require('./Router').default;
const Sitemap = require('./node_modules/react-router-sitemap').default;

(
    new Sitemap(router)
        .build('http://etrix.ir')
        .save('./sitemap.xml')
);