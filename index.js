const fp = require('fastify-plugin');
const {Nuxt, Builder} = require('nuxt');
const defaults = require('lodash.defaults');

module.exports = fp(/**
 @param {fastify.FastifyInstance} fastify
 @param {Object} opts
 @param {Function} next
 **/
    function (fastify, opts, next) {
        if (!opts.config || typeof opts.config !== 'object') {
            return next(new Error('You need to provide a nuxt config.'));
        }
        const config = opts.config || {};
        if (typeof(config.dev) !== typeof(true)) {
            config.dev = process.env.NODE_ENV !== 'production';
        }
        const nuxt = new Nuxt(config);
        let attachProperties = [];
        if (opts.attachProperties && Array.isArray(opts.attachProperties)) {
            attachProperties = opts.attachProperties;
        }

        let build = true;
        let buildPromise = Promise.resolve();

        if (config.dev) {
            build = false;
            buildPromise = new Builder(nuxt).build().then(() => {
                build = true;
            });
        }

        fastify.decorate('nuxt', (path, options = {}) => {
            if (options.handler && typeof options.handler === 'function') {
                options.handler = async (request, reply) => {
                    if (!build) {
                        await buildPromise;
                    }
                    return await options.handler(request, reply, nuxt);
                };
            }
            const opt = defaults({
                method: 'GET',
                url: path,
                handler: async (request, reply) => {
                    if (!build) {
                        await buildPromise;
                    }
                    reply.sent = true;
                    let rq = request.raw;
                    for (const key of attachProperties) {
                        if (request[key]) rq[key] = request[key];
                    }
                    return nuxt.render(rq, reply.res);
                }
            }, options);
            fastify.route(opt);
        }).after(() => {
            fastify.nuxt('/_nuxt/*');
            fastify.nuxt('/__webpack_hmr/*', {
                method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS']
            });
        });
        next();
    }, {
        fastify: '>=1.0.0',
    });