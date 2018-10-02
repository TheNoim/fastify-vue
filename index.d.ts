/// <reference types="fastify" />

import * as fastify from 'fastify';
import * as http from "http";
import {RegisterOptions} from "fastify";
import {Plugin} from "fastify";
import {RequestHandler} from "fastify";

declare interface HttpServer extends http.Server {}
declare interface HttpRequest extends http.IncomingMessage {}
declare interface HttpResponse extends http.ServerResponse {}

declare interface FastifyVueOptions {
    config?: Object
}

declare let fastifyVue: fastify.Plugin<HttpServer, HttpRequest, HttpResponse, FastifyVueOptions>;

declare module 'fastify' {

    export interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse> extends FastifyInstance {
        register<T extends RegisterOptions<HttpServer, HttpRequest, HttpResponse>>(plugin: Plugin<HttpServer, HttpRequest, HttpResponse, T>, opts?: FastifyVueOptions | T): FastifyInstance<HttpServer, HttpRequest, HttpResponse>

        // noinspection SpellCheckingInspection
        nuxt(path: String, options?: NuxtDecoratorOptions): void
    }

    export interface NuxtDecoratorOptions {
        handler?: RequestHandler<HttpRequest, HttpResponse>
    }
}

export = fastifyVue;