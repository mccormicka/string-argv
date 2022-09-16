"use strict";
var {default: StringArgv, parseArgsStringToArgv} = require("..");


describe("Require", function () {
  it("should correctly import both from default and from named export", function () {
    expect(StringArgv).not.toBeNull();
    expect(StringArgv).toBeInstanceOf(Function);
    expect(StringArgv.length).toBe(3);

    expect(parseArgsStringToArgv).not.toBeNull();
    expect(parseArgsStringToArgv).toBeInstanceOf(Function);
    expect(parseArgsStringToArgv.length).toBe(3);

    expect(parseArgsStringToArgv).toBe(StringArgv);
  });
});

