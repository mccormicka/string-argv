"use strict";

describe("SHOULD", function() {
  it("Be able to acquire index", function() {
    var test = require("../index");
    expect(test).not.toBeNull();
  });
});

describe("Process ", function() {
  var util = require("../index");

  function parseAndValidate(value, expectedResult, tryWithSingleQuotes) {
    var results = util.parseArgsStringToArgv(value);
    expect(results.length).toBe(expectedResult.length);
    for (var i = 0; i < results.length; ++i) {
      expect(results[i]).toEqual(expectedResult[i]);
    }
    if (tryWithSingleQuotes) {
      var expectedWithSingleQuotes = expectedResult.map(function(r) {
        return r.replace(/"/g, "'");
      });
      parseAndValidate(value.replace(/"/g, "'"), expectedWithSingleQuotes, false);
    }
  }

  it("an arguments array correctly with file and env", function(done) {
    var results = util.parseArgsStringToArgv("-test", "node", "testing.js");
    expect(results.length).toBe(3);
    expect(results[0]).toEqual("node");
    expect(results[1]).toEqual("testing.js");
    expect(results[2]).toEqual("-test");
    done();
  });

  it("an arguments array correctly without file and env", function(done) {
    parseAndValidate("-test", ["-test"]);
    done();
  });

  it("a single key", function(done) {
    parseAndValidate("-test", ["-test"]);
    done();
  });

  it("a single key with a value", function(done) {
    parseAndValidate("-test testing", ["-test", "testing"]);
    done();
  });

  it("a single key=value", function(done) {
    parseAndValidate("-test=testing", ["-test=testing"]);
    done();
  });

  it("a single value with quotes", function(done) {
    parseAndValidate('"test quotes"', ["test quotes"], true);
    done();
  });

  it("a single value with empty quotes", function(done) {
    parseAndValidate('""', [""], true);
    done();
  });

  it("a complex string with quotes", function(done) {
    parseAndValidate('-testing test -valid=true --quotes "test quotes"', [
      "-testing",
      "test",
      "-valid=true",
      "--quotes",
      "test quotes",
    ], true);
    done();
  });

  it("a complex string with empty quotes", function(done) {
    parseAndValidate('-testing test -valid=true --quotes ""', [
      "-testing",
      "test",
      "-valid=true",
      "--quotes",
      "",
    ], true);
    done();
  });

  it("a complex string with nested quotes", function(done) {
    parseAndValidate('--title "Peter\'s Friends" --name \'Phil "The Power" Taylor\'', [
      "--title",
      "Peter's Friends",
      "--name",
      'Phil "The Power" Taylor',
    ]);
    done();
  });

  it("a complex key value with quotes", function(done) {
    parseAndValidate('--name=\'Phil Taylor\' --title="Peter\'s Friends"', [
      "--name='Phil Taylor'",
      '--title="Peter\'s Friends"',
    ]);
    done();
  });

  it("a complex key value with nested quotes", function(done) {
    parseAndValidate('--name=\'Phil "The Power" Taylor\'', [
      '--name=\'Phil "The Power" Taylor\''
    ]);
    done();
  });

  it("nested quotes with no spaces", function(done) {
    parseAndValidate('jake run:silent["echo 1"] --trace', [
      "jake",
      'run:silent["echo 1"]',
      "--trace",
    ], true);
    done();
  });

  it("multiple nested quotes with no spaces", function(done) {
    parseAndValidate('jake run:silent["echo 1"]["echo 2"] --trace', [
      "jake",
      'run:silent["echo 1"]["echo 2"]',
      "--trace",
    ], true);
    done();
  });

  it("complex multiple nested quotes", function(done) {
    parseAndValidate('cli value("echo")[\'grep\']+"Peter\'s Friends"', [
      "cli",
      'value("echo")[\'grep\']+"Peter\'s Friends"',
    ]);
    done();
  });
});
