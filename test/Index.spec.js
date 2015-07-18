'use strict';

describe('SHOULD', function () {
    it('Be able to acquire index', function () {
        var test = require('../index');
        expect(test).not.toBeNull();
    });

    describe('Process ', function () {
        var util = require('../index');

        it('an arguments array correctly with file and env', function (done) {
            var results = util.parseArgsStringToArgv('-test', 'node', 'testing.js');
            expect(results.length).toBe(3);
            expect(results[0]).toEqual('node');
            expect(results[1]).toEqual('testing.js');
            expect(results[2]).toEqual('-test');
            done();
        });

        it('an arguments array correctly without file and env', function (done) {
            var results = util.parseArgsStringToArgv('-test');
            expect(results.length).toBe(1);
            expect(results[0]).toEqual('-test');
            done();
        });

        it('a single key', function (done) {
            var results = util.parseArgsStringToArgv('-test');
            expect(results.length).toBe(1);
            expect(results[0]).toEqual('-test');
            done();
        });

        it('a single key with a value', function (done) {
            var results = util.parseArgsStringToArgv('-test testing');
            expect(results.length).toBe(2);
            expect(results[0]).toEqual('-test');
            expect(results[1]).toEqual('testing');
            done();
        });

        it('a single key=value', function (done) {
            var results = util.parseArgsStringToArgv('-test=testing');
            expect(results.length).toBe(1);
            expect(results[0]).toEqual('-test=testing');
            done();
        });

        it('a single value with double quotes', function (done) {
            var results = util.parseArgsStringToArgv('"test quotes"');
            expect(results.length).toBe(1);
            expect(results[0]).toEqual('test quotes');
            done();
        });

        it('a single value with single quotes', function (done) {
            var results = util.parseArgsStringToArgv('\'test quotes\'');
            expect(results.length).toBe(1);
            expect(results[0]).toEqual('test quotes');
            done();
        });

        it('a complex string with double quotes', function (done) {
            var results = util.parseArgsStringToArgv('-testing test -valid=true --quotes "test quotes"');
            expect(results.length).toBe(5);
            expect(results[0]).toEqual('-testing');
            expect(results[1]).toEqual('test');
            expect(results[2]).toEqual('-valid=true');
            expect(results[3]).toEqual('--quotes');
            expect(results[4]).toEqual('test quotes');
            done();
        });

        it('a complex string with single quotes', function (done) {
            var results = util.parseArgsStringToArgv('-testing test -valid=true --quotes \'test quotes\'');
            expect(results.length).toBe(5);
            expect(results[0]).toEqual('-testing');
            expect(results[1]).toEqual('test');
            expect(results[2]).toEqual('-valid=true');
            expect(results[3]).toEqual('--quotes');
            expect(results[4]).toEqual('test quotes');
            done();
        });

        it('a complex string with nested quotes', function (done) {
            var results = util.parseArgsStringToArgv('--title "Peter\'s Friends" --name \'Phil "The Power" Taylor\'');
            expect(results.length).toBe(4);
            expect(results[0]).toEqual("--title");
            expect(results[1]).toEqual("Peter's Friends");
            expect(results[2]).toEqual("--name");
            expect(results[3]).toEqual('Phil "The Power" Taylor');
            done();
        });

    });
});