const fastify = require('fastify')();

fastify.register(require('./index'), {
    config: {
        dev: true
    }
}).after(e => {
    if (e) console.trace(e);
    fastify.nuxt('/');
    fastify.nuxt('/test/:id');
});

fastify.listen(1337, '0.0.0.0' , (e) => {
    if (e) console.trace(e);
    console.warn('http://0.0.0.0:1337');
});