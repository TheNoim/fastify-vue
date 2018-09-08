const Fastify = require('fastify');
const fetch = require('node-fetch');

test("fastify should have decorator nuxt", done => {
    const fastify = Fastify();

    const pl = require("./index");

    fastify.register(pl, {config: { dev: false }}).after(err => {
        expect(err).toBeFalsy();
        expect(fastify.nuxt).toBeDefined();
        done();
    });

    fastify.close();
});

test("should throw if no config is provided", done => {
    const fastify = Fastify();

    const pl = require("./index");

    fastify.register(pl).after(err => {
        expect(err).toBeDefined();
        expect(err.message).toBeDefined();
        expect(err.message).toEqual("You need to provide a nuxt config.");
        done();
    });

    fastify.close();
});

test("page should be reach able", done => {
    const fastify = Fastify();

    const pl = require("./index");

    fastify.register(pl, {config: { dev: false }}).after(err => {
        expect(err).toBeFalsy();
        fastify.nuxt("/");
    });

    fastify.listen(1337, async err => {
        expect(err).toBeFalsy();
        const r = await fetch('http://127.0.0.1:1337/');
        const data = await r.text();
        expect(data).toContain("Nice to meet you");
        fastify.close(() => {
            done();
        });
    });
}, 15000);