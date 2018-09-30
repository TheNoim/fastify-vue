# fastify-vue-plugin

_A [nuxt.js](https://nuxtjs.org) [fastify](https://fastify.io) plugin_

[![NpmLicense](https://img.shields.io/npm/l/fastify-vue-plugin.svg?style=for-the-badge)](https://www.npmjs.com/package/fastify-vue-plugin)
[![David](https://img.shields.io/david/TheNoim/fastify-vue.svg?style=for-the-badge)](https://github.com/TheNoim/fastify-vue)
[![GitHub package version](https://img.shields.io/github/package-json/v/TheNoim/fastify-vue.svg?style=for-the-badge)](https://github.com/TheNoim/fastify-vue)
[![NPM Link](https://img.shields.io/badge/npm-fastify--vue--plugin-red.svg?style=for-the-badge)](https://www.npmjs.com/package/fastify-vue-plugin) [![Greenkeeper badge](https://badges.greenkeeper.io/TheNoim/fastify-vue.svg)](https://greenkeeper.io/)

### Installation

```bash
yarn add fastify-vue-plugin
# or if you use npm
npm i fastify-vue-plugin --save
```

### Usage

```javascript
const fastify = require('fastify')();

fastify.register(require('fastify-vue-plugin'), {
    config: require('./nuxt.config.js')
}).after(e => {
    if (e) console.trace(e);
    fastify.nuxt('/'); // is equals: index.vue
    fastify.nuxt('/dashboard');
    // add all your nuxtjs routes
    // make sure there are added in the after function
    
    // use params
    fastify.nuxt('/product/:id');
});

// other stuff/routes

fastify.listen(1337, '0.0.0.0' , (e) => {
    if (e) console.trace(e);
    console.warn('http://0.0.0.0:1337');
});
```

### Notice

This plugin is inspired by the [fastify-react](https://github.com/fastify/fastify-react) plugin.

### License

The MIT License (MIT)

Copyright (c) 2018 Nils Bergmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.