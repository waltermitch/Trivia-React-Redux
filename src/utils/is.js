/*!
* is.js 0.9.0
* Author: Aras Atasaygin
*/

//
// Baseline
/* -------------------------------------------------------------------------- */

// define 'is' object and current version
const is = {};
is.VERSION = '0.9.0';

// define interfaces
is.not = {};
is.all = {};
is.any = {};

// cache some methods to call later on
let toString = Object.prototype.toString;
let slice = Array.prototype.slice;
let hasOwnProperty = Object.prototype.hasOwnProperty;

// helper function which reverses the sense of predicate result
function not(func) {
  return function() {
    return !func.apply(null, slice.call(arguments));
  };
}

// helper function which call predicate function per parameter and return true if all pass
function all(func) {
  return function() {
    let params = getParams(arguments);
    let length = params.length;
    for (let i = 0; i < length; i++) {
      if (!func.call(null, params[i])) {
        return false;
      }
    }
    return true;
  };
}

// helper function which call predicate function per parameter and return true if any pass
function any(func) {
  return function() {
    let params = getParams(arguments);
    let length = params.length;
    for (let i = 0; i < length; i++) {
      if (func.call(null, params[i])) {
        return true;
      }
    }
    return false;
  };
}

// build a 'comparator' object for various comparison checks
let comparator = {
  '<': function(a, b) { return a < b; },
  '<=': function(a, b) { return a <= b; },
  '>': function(a, b) { return a > b; },
  '>=': function(a, b) { return a >= b; }
};

// helper function which compares a version to a range
function compareVersion(version, range) {
  let string = (range + '');
  let n = +(string.match(/\d+/) || NaN);
  let op = string.match(/^[<>]=?|/)[0];
  return comparator[op] ? comparator[op](version, n) : (version === n || n !== n);
}

// helper function which extracts params from arguments
function getParams(args) {
  let params = slice.call(args);
  let length = params.length;
  if (length === 1 && is.array(params[0])) {    // support array
    params = params[0];
  }
  return params;
}

// Type checks
/* -------------------------------------------------------------------------- */

// is a given value Arguments?
is.arguments = function(value) {    // fallback check is for IE
  return toString.call(value) === '[object Arguments]' ||
    (value != null && typeof value === 'object' && 'callee' in value);
};

// is a given value Array?
is.array = Array.isArray || function(value) {    // check native isArray first
  return toString.call(value) === '[object Array]';
};

// is a given value Boolean?
is.boolean = function(value) {
  return value === true || value === false || toString.call(value) === '[object Boolean]';
};

// is a given value Char?
is.char = function(value) {
  return is.string(value) && value.length === 1;
};

// is a given value Date Object?
is.date = function(value) {
  return toString.call(value) === '[object Date]';
};

// is a given object a DOM node?
is.domNode = function(object) {
  return is.object(object) && object.nodeType > 0;
};

// is a given value Error object?
is.error = function(value) {
  return toString.call(value) === '[object Error]';
};

// is a given value function?
is['function'] = function(value) {    // fallback check is for IE
  return toString.call(value) === '[object Function]' || typeof value === 'function';
};

// is given value a pure JSON object?
is.json = function(value) {
  return toString.call(value) === '[object Object]';
};

// is a given value NaN?
is.nan = function(value) {
  return Number.isNaN(value);
};

// is a given value null?
is['null'] = function(value) {
  return value === null;
};

// is a given value number?
is.number = function(value) {
  return Number.isFinite(value);
};

// is a given value object?
is.object = function(value) {
  return Object(value) === value;
};

// is a given value RegExp?
is.regexp = function(value) {
  return toString.call(value) === '[object RegExp]';
};

// are given values same type?
// prevent NaN, Number same type check
is.sameType = function(value, other) {
  let tag = toString.call(value);
  if (tag !== toString.call(other)) {
    return false;
  }
  if (tag === '[object Number]') {
    return !is.any.nan(value, other) || is.all.nan(value, other);
  }
  return true;
};
// sameType method does not support 'all' and 'any' interfaces
is.sameType.api = ['not'];

// is a given value String?
is.string = function(value) {
  return toString.call(value) === '[object String]';
};

// is a given value undefined?
is.undefined = function(value) {
  return value === void 0;
};

// is a given value window?
// setInterval method is only available for window object
is.windowObject = function(value) {
  return value != null && typeof value === 'object' && 'setInterval' in value;
};

// Presence checks
/* -------------------------------------------------------------------------- */

//is a given value empty? Objects, arrays, strings
is.empty = function(value) {
  if (is.object(value)) {
    let length = Object.getOwnPropertyNames(value).length;
    return !!(length === 0 || (length === 1 && is.array(value)) ||
      (length === 2 && is.arguments(value)));

  }
  return value === '';
};

// is a given value existy?
is.existy = function(value) {
  return value != null;
};

// is a given value falsy?
is.falsy = function(value) {
  return !value;
};

// is a given value truthy?
is.truthy = not(is.falsy);

// Arithmetic checks
/* -------------------------------------------------------------------------- */

// is a given number above minimum parameter?
is.above = function(n, min) {
  return is.all.number(n, min) && n > min;
};
// above method does not support 'all' and 'any' interfaces
is.above.api = ['not'];

// is a given number decimal?
is.decimal = function(n) {
  return is.number(n) && n % 1 !== 0;
};

// are given values equal? supports numbers, strings, regexes, booleans
// TODO: Add object and array support
is.equal = function(value, other) {
  // check 0 and -0 equity with Infinity and -Infinity
  if (is.all.number(value, other)) {
    return value === other && 1 / value === 1 / other;
  }
  // check regexes as strings too
  if (is.all.string(value, other) || is.all.regexp(value, other)) {
    return '' + value === '' + other;
  }
  if (is.all.boolean(value, other)) {
    return value === other;
  }
  return false;
};
// equal method does not support 'all' and 'any' interfaces
is.equal.api = ['not'];

// is a given number even?
is.even = function(n) {
  return is.number(n) && n % 2 === 0;
};

// is a given number finite?
is.finite = isFinite || function(n) {
  return is.not.infinite(n) && is.not.nan(n);
};

// is a given number infinite?
is.infinite = function(n) {
  return n === Infinity || n === -Infinity;
};

// is a given number integer?
is.integer = function(n) {
  return Number.isInteger(n);
};

// is a given number negative?
is.negative = function(n) {
  return is.number(n) && n < 0;
};

// is a given number odd?
is.odd = function(n) {
  return is.number(n) && (n % 2 === 1 || n % 2 === -1);
};

// is a given number positive?
is.positive = function(n) {
  return is.number(n) && n > 0;
};

// is a given number above maximum parameter?
is.under = function(n, max) {
  return is.all.number(n, max) && n < max;
};
// least method does not support 'all' and 'any' interfaces
is.under.api = ['not'];

// is a given number within minimum and maximum parameters?
is.within = function(n, min, max) {
  return is.all.number(n, min, max) && n > min && n < max;
};
// within method does not support 'all' and 'any' interfaces
is.within.api = ['not'];

// Regexp checks
/* -------------------------------------------------------------------------- */
// Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
// Scott Gonzalez: Email address validation

// dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
// eppPhone match extensible provisioning protocol format
// nanpPhone match north american number plan format
// time match hours, minutes, and seconds, 24-hour clock
let regexes = {
  affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
  alphaNumeric: /^[A-Za-z0-9]+$/,
  caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
  creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
  dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
  email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
  eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
  hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
  hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
  nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
  timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
  ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
  url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
  usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
};

function regexpCheck(regexp, regexes) {
  is[regexp] = function(value) {
    return is.existy(value) && regexes[regexp].test(value);
  };
}

// create regexp checks methods from 'regexes' object
for (let regexp in regexes) {
  if (regexes.hasOwnProperty(regexp)) {
    regexpCheck(regexp, regexes);
  }
}

// simplify IP checks by calling the regex helpers for IPv4 and IPv6
is.ip = function(value) {
  return is.ipv4(value) || is.ipv6(value);
};

// String checks
/* -------------------------------------------------------------------------- */

// is a given string or sentence capitalized?
is.capitalized = function(string) {
  if (is.not.string(string)) {
    return false;
  }
  let words = string.split(' ');
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.length) {
      let chr = word.charAt(0);
      if (chr !== chr.toUpperCase()) {
        return false;
      }
    }
  }
  return true;
};

// is string end with a given target parameter?
is.endWith = function(string, target) {
  if (is.not.string(string)) {
    return false;
  }
  target += '';
  let position = string.length - target.length;
  return position >= 0 && string.indexOf(target, position) === position;
};
// endWith method does not support 'all' and 'any' interfaces
is.endWith.api = ['not'];

// is a given string include parameter target?
is.include = function(string, target) {
  return string.indexOf(target) > -1;
};
// include method does not support 'all' and 'any' interfaces
is.include.api = ['not'];

// is a given string all lowercase?
is.lowerCase = function(string) {
  return is.string(string) && string === string.toLowerCase();
};

// is a given string palindrome?
is.palindrome = function(string) {
  if (is.not.string(string)) {
    return false;
  }
  string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
  let length = string.length - 1;
  for (let i = 0, half = Math.floor(length / 2); i <= half; i++) {
    if (string.charAt(i) !== string.charAt(length - i)) {
      return false;
    }
  }
  return true;
};

// is a given value space?
// horizontal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
is.space = function(value) {
  if (is.not.char(value)) {
    return false;
  }
  let charCode = value.charCodeAt(0);
  return (charCode > 8 && charCode < 14) || charCode === 32;
};

// is string start with a given target parameter?
is.startWith = function(string, target) {
  return is.string(string) && string.indexOf(target) === 0;
};
// startWith method does not support 'all' and 'any' interfaces
is.startWith.api = ['not'];

// is a given string all uppercase?
is.upperCase = function(string) {
  return is.string(string) && string === string.toUpperCase();
};

// Time checks
/* -------------------------------------------------------------------------- */

let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// is a given dates day equal given day parameter?
is.day = function(date, day) {
  return is.date(date) && day.toLowerCase() === days[date.getDay()];
};
// day method does not support 'all' and 'any' interfaces
is.day.api = ['not'];

// is a given date in daylight saving time?
is.dayLightSavingTime = function(date) {
  let january = new Date(date.getFullYear(), 0, 1);
  let july = new Date(date.getFullYear(), 6, 1);
  let stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
  return date.getTimezoneOffset() < stdTimezoneOffset;
};

// is a given date future?
is.future = function(date) {
  let now = new Date();
  return is.date(date) && date.getTime() > now.getTime();
};

// is date within given range?
is.inDateRange = function(date, start, end) {
  if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
    return false;
  }
  let stamp = date.getTime();
  return stamp > start.getTime() && stamp < end.getTime();
};
// inDateRange method does not support 'all' and 'any' interfaces
is.inDateRange.api = ['not'];

// is a given date in last month range?
is.inLastMonth = function(date) {
  return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
};

// is a given date in last week range?
is.inLastWeek = function(date) {
  return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
};

// is a given date in last year range?
is.inLastYear = function(date) {
  return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
};

// is a given date in next month range?
is.inNextMonth = function(date) {
  return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
};

// is a given date in next week range?
is.inNextWeek = function(date) {
  return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
};

// is a given date in next year range?
is.inNextYear = function(date) {
  return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
};

// is the given year a leap year?
is.leapYear = function(year) {
  return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
};

// is a given dates month equal given month parameter?
is.month = function(date, month) {
  return is.date(date) && month.toLowerCase() === months[date.getMonth()];
};
// month method does not support 'all' and 'any' interfaces
is.month.api = ['not'];

// is a given date past?
is.past = function(date) {
  let now = new Date();
  return is.date(date) && date.getTime() < now.getTime();
};

// is a given date in the parameter quarter?
is.quarterOfYear = function(date, quarter) {
  return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);
};
// quarterOfYear method does not support 'all' and 'any' interfaces
is.quarterOfYear.api = ['not'];

// is a given date indicate today?
is.today = function(date) {
  let now = new Date();
  let todayString = now.toDateString();
  return is.date(date) && date.toDateString() === todayString;
};

// is a given date indicate tomorrow?
is.tomorrow = function(date) {
  let now = new Date();
  let tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
  return is.date(date) && date.toDateString() === tomorrowString;
};

// is a given date weekend?
// 6: Saturday, 0: Sunday
is.weekend = function(date) {
  return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
};

// is a given date weekday?
is.weekday = not(is.weekend);

// is a given dates year equal given year parameter?
is.year = function(date, year) {
  return is.date(date) && is.number(year) && year === date.getFullYear();
};
// year method does not support 'all' and 'any' interfaces
is.year.api = ['not'];

// is a given date indicate yesterday?
is.yesterday = function(date) {
  let now = new Date();
  let yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
  return is.date(date) && date.toDateString() === yesterdayString;
};

// Environment checks
/* -------------------------------------------------------------------------- */

let freeGlobal = is.windowObject(typeof global == 'object' && global) && global;
let freeSelf = is.windowObject(typeof window.self == 'object' && window.self) && window.self;
let thisGlobal = is.windowObject(typeof this == 'object' && this) && this;
let root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

let document = freeSelf && freeSelf.document;
let previousIs = root.is;

// store navigator properties to use later
let navigator = freeSelf && freeSelf.navigator;
let platform = (navigator && navigator.platform || '').toLowerCase();
let userAgent = (navigator && navigator.userAgent || '').toLowerCase();
let vendor = (navigator && navigator.vendor || '').toLowerCase();

// is current device android?
is.android = function() {
  return /android/.test(userAgent);
};
// android method does not support 'all' and 'any' interfaces
is.android.api = ['not'];

// is current device android phone?
is.androidPhone = function() {
  return /android/.test(userAgent) && /mobile/.test(userAgent);
};
// androidPhone method does not support 'all' and 'any' interfaces
is.androidPhone.api = ['not'];

// is current device android tablet?
is.androidTablet = function() {
  return /android/.test(userAgent) && !/mobile/.test(userAgent);
};
// androidTablet method does not support 'all' and 'any' interfaces
is.androidTablet.api = ['not'];

// is current device blackberry?
is.blackberry = function() {
  return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
};
// blackberry method does not support 'all' and 'any' interfaces
is.blackberry.api = ['not'];

// is current browser chrome?
// parameter is optional
is.chrome = function(range) {
  let match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
  return match !== null && is.not.opera() && compareVersion(match[1], range);
};
// chrome method does not support 'all' and 'any' interfaces
is.chrome.api = ['not'];

// is current device desktop?
is.desktop = function() {
  return is.not.mobile() && is.not.tablet();
};
// desktop method does not support 'all' and 'any' interfaces
is.desktop.api = ['not'];

// is current browser edge?
// parameter is optional
is.edge = function(range) {
  let match = userAgent.match(/edge\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// edge method does not support 'all' and 'any' interfaces
is.edge.api = ['not'];

// is current browser firefox?
// parameter is optional
is.firefox = function(range) {
  let match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// firefox method does not support 'all' and 'any' interfaces
is.firefox.api = ['not'];

// is current browser internet explorer?
// parameter is optional
is.ie = function(range) {
  let match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// ie method does not support 'all' and 'any' interfaces
is.ie.api = ['not'];

// is current device ios?
is.ios = function() {
  return is.iphone() || is.ipad() || is.ipod();
};
// ios method does not support 'all' and 'any' interfaces
is.ios.api = ['not'];

// is current device ipad?
// parameter is optional
is.ipad = function(range) {
  let match = userAgent.match(/ipad.+?os (\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// ipad method does not support 'all' and 'any' interfaces
is.ipad.api = ['not'];

// is current device iphone?
// parameter is optional
is.iphone = function(range) {
  // avoid false positive for Facebook in-app browser on ipad;
  // original iphone doesn't have the OS portion of the UA
  let match = is.ipad() ? null : userAgent.match(/iphone(?:.+?os (\d+))?/);
  return match !== null && compareVersion(match[1] || 1, range);
};
// iphone method does not support 'all' and 'any' interfaces
is.iphone.api = ['not'];

// is current device ipod?
// parameter is optional
is.ipod = function(range) {
  let match = userAgent.match(/ipod.+?os (\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// ipod method does not support 'all' and 'any' interfaces
is.ipod.api = ['not'];

// is current operating system linux?
is.linux = function() {
  return /linux/.test(platform) && is.not.android();
};
// linux method does not support 'all' and 'any' interfaces
is.linux.api = ['not'];

// is current operating system mac?
is.mac = function() {
  return /mac/.test(platform);
};
// mac method does not support 'all' and 'any' interfaces
is.mac.api = ['not'];

// is current device mobile?
is.mobile = function() {
  return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
};
// mobile method does not support 'all' and 'any' interfaces
is.mobile.api = ['not'];

// is current state offline?
is.offline = not(is.online);
// offline method does not support 'all' and 'any' interfaces
is.offline.api = ['not'];

// is current state online?
is.online = function() {
  return !navigator || navigator.onLine === true;
};
// online method does not support 'all' and 'any' interfaces
is.online.api = ['not'];

// is current browser opera?
// parameter is optional
is.opera = function(range) {
  let match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// opera method does not support 'all' and 'any' interfaces
is.opera.api = ['not'];

// is current browser opera mini?
// parameter is optional
is.operaMini = function(range) {
  let match = userAgent.match(/opera mini\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// operaMini method does not support 'all' and 'any' interfaces
is.operaMini.api = ['not'];

// is current browser phantomjs?
// parameter is optional
is.phantom = function(range) {
  let match = userAgent.match(/phantomjs\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
// phantom method does not support 'all' and 'any' interfaces
is.phantom.api = ['not'];

// is current browser safari?
// parameter is optional
is.safari = function(range) {
  let match = userAgent.match(/version\/(\d+).+?safari/);
  return match !== null && compareVersion(match[1], range);
};
// safari method does not support 'all' and 'any' interfaces
is.safari.api = ['not'];

// is current device tablet?
is.tablet = function() {
  return is.ipad() || is.androidTablet() || is.windowsTablet();
};
// tablet method does not support 'all' and 'any' interfaces
is.tablet.api = ['not'];

// is current device supports touch?
is.touchDevice = function() {
  return !!document && ('ontouchstart' in freeSelf ||
    ('DocumentTouch' in freeSelf && window.DocumentTouch && document instanceof window.DocumentTouch));
};
// touchDevice method does not support 'all' and 'any' interfaces
is.touchDevice.api = ['not'];

// is current operating system windows?
is.windows = function() {
  return /win/.test(platform);
};
// windows method does not support 'all' and 'any' interfaces
is.windows.api = ['not'];

// is current device windows phone?
is.windowsPhone = function() {
  return is.windows() && /phone/.test(userAgent);
};
// windowsPhone method does not support 'all' and 'any' interfaces
is.windowsPhone.api = ['not'];

// is current device windows tablet?
is.windowsTablet = function() {
  return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);
};
// windowsTablet method does not support 'all' and 'any' interfaces
is.windowsTablet.api = ['not'];

// Object checks
/* -------------------------------------------------------------------------- */

// has a given object got parameterized count property?
is.propertyCount = function(object, count) {
  if (is.not.object(object) || is.not.number(count)) {
    return false;
  }
  let n = 0;
  for (let property in object) {
    if (hasOwnProperty.call(object, property) && ++n > count) {
      return false;
    }
  }
  return n === count;
};
// propertyCount method does not support 'all' and 'any' interfaces
is.propertyCount.api = ['not'];

// is given object has parameterized property?
is.propertyDefined = function(object, property) {
  return is.object(object) && is.string(property) && property in object;
};
// propertyDefined method does not support 'all' and 'any' interfaces
is.propertyDefined.api = ['not'];

// is a given value thenable (like Promise)?
is.thenable = function(value) {
  return is.object(value) && typeof value.then === 'function';
};

// Array checks
/* -------------------------------------------------------------------------- */

// is a given item in an array?
is.inArray = function(value, array) {
  if (is.not.array(array)) {
    return false;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};
// inArray method does not support 'all' and 'any' interfaces
is.inArray.api = ['not'];

// is a given array sorted?
is.sorted = function(array, sign) {
  if (is.not.array(array)) {
    return false;
  }
  let predicate = comparator[sign] || comparator['>='];
  for (let i = 1; i < array.length; i++) {
    if (!predicate(array[i], array[i - 1])) {
      return false;
    }
  }
  return true;
};


// API
// Set 'not', 'all' and 'any' interfaces to methods based on their api property
/* -------------------------------------------------------------------------- */

function setInterfaces() {
  let options = is;
  for (let option in options) {
    if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
      let interfaces = options[option].api || ['not', 'all', 'any'];
      for (let i = 0; i < interfaces.length; i++) {
        if (interfaces[i] === 'not') {
          is.not[option] = not(is[option]);
        }
        if (interfaces[i] === 'all') {
          is.all[option] = all(is[option]);
        }
        if (interfaces[i] === 'any') {
          is.any[option] = any(is[option]);
        }
      }
    }
  }
}
setInterfaces();

// Configuration methods
// Intentionally added after setInterfaces function
/* -------------------------------------------------------------------------- */

// change namespace of library to prevent name collisions
// let preferredName = is.setNamespace();
// preferredName.odd(3);
// => true
is.setNamespace = function() {
  root.is = previousIs;
  return this;
};

// set optional regexes to methods
is.setRegexp = function(regexp, name) {
  for (let r in regexes) {
    if (hasOwnProperty.call(regexes, r) && (name === r)) {
      regexes[r] = regexp;
    }
  }
};

export default is;

export const getUtmSource = window.getUtmSource = () => {
  let utmSource = window.localStorage.getItem('utmSource');
  if (utmSource) {
    utmSource = utmSource.replace(/["]+/g, '');
    return utmSource;
  }
  return '';
}

export const getUtmCampaign = window.getUtmCampaign = () => {
  let utmCampaign = window.localStorage.getItem('utmCampaign');
  if (utmCampaign) {
    utmCampaign = utmCampaign.replace(/["]+/g, '');
    return utmCampaign;
  }
  return '';
}

export const getObWidgetName = window.getObWidgetName = () => {
  const splitNum = Math.floor(Math.random() * 101);
  const splitBreak = 50;
  let variant = false;

  if(splitNum>splitBreak){
    variant=true;
  }

  let obWidgetName = "CRMB_16";


//TF_1 - Desktop
//CRMB_16 - USMA
//CRMB_1 - USMI
//AR_1 - USTI
//AR_2 - USTA

  if(is.desktop()){
    if (variant === false){
      obWidgetName="TF_1"
    } else {
      obWidgetName="AR_19"
    }
  }

  if(is.mobile() && is.android()){
    if (variant === false){
      obWidgetName = "CRMB_16";
    } else {
      obWidgetName="CRMB_18"
    }
  }

  if(is.mobile() && is.ios()){
    if (variant === false){
      obWidgetName = "CRMB_1";
    } else {
      obWidgetName="CRMB_17"
    }
  }

  if(is.tablet() && is.android()){
    if (variant === false){
      obWidgetName = "AR_2";
    } else {
      obWidgetName="AR_18"
    }
  }

  if(is.tablet() && is.ios()){
    if (variant === false){
      obWidgetName = "AR_1";
    } else {
      obWidgetName="AR_17"
    }
  }

  return obWidgetName;
}
