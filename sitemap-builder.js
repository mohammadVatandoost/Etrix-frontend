require('babel-register');

const router = require('./Router').default;
const Sitemap = require('../').default;

(
    new Sitemap(router)
        .build('http://etrix.ir')
        .save('./sitemap.xml')
);