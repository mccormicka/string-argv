"use strict";

module.exports = parseArgsStringToArgv;
module.exports.parseArgsStringToArgv = parseArgsStringToArgv;

function parseArgsStringToArgv(value, env, file) {
  // ([^\s'"]([^\s'"]*(['"])([^\3]*?)\3)+[^\s'"]*) Matches nested quotes until the first space outside of quotes

  // [^\s'"]+ or Match if not a space ' or "

  // (['"])([^\5]*?)\5 or Match "quoted text" without quotes
  // `\3` and `\5` are a backreference to the quote style (' or ") captured
  var myRegexp = /([^\s'"]([^\s'"]*(['"])([^\3]*?)\3)+[^\s'"]*)|[^\s'"]+|(['"])([^\5]*?)\5/gi;
  var myString = value;
  var myArray = [
  ];
  if (env) {
    myArray.push(env);
  }
  if (file) {
    myArray.push(file);
  }
  var match;
  do {
        // Each call to exec returns the next regex match as an array
    match = myRegexp.exec(myString);
    if (match !== null) {
      // Index 1 in the array is the captured group if it exists
      // Index 0 is the matched text, which we use if no captured group exists
      myArray.push(firstString(match[1], match[6], match[0]));
    }
  } while (match !== null);

  return myArray;
}

// Accepts any number of arguments, and returns the first one that is a string
// (even an empty string)
function firstString() {
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (typeof arg === "string") {
      return arg;
    }
  }
}
