// Utils
const isFnCall = function (key){
  if (typeof key !== 'string') return false;
  return key.slice(-2) === "()";
};

/* A value is accesible once it has properties.
 * This said, strings and numbers are accessible, soly undefined and null aren't
 */
const isAssignable = function (obj) {
  return obj !== null && obj !== undefined;
};

const isUndefOrPureObj = function (obj) {
  return obj === undefined || (obj !== null && typeof obj === 'object' && !Array.isArray(obj));
};

const isObj = function (obj) {
  return obj !== null && typeof obj === 'object';
};

/*
 * @param {key} string concatenation of nested keys in this form: 'foo.bar.toto'.
 *  You can even call a function if the last key ends with '()'.
 * @param {obj} the object we are accessing
 * @param {...args} a sequence of arguments that may be passed to the function we are calling
 * @return a nested value OR the result of a nested function OR undefined
 */
module.exports.g = (key, obj, ...args) => {
  let splitted = key.split('.');
  let lastkey = splitted.pop();
  let isFnCallLastkey = isFnCall(lastkey);
  lastkey = isFnCallLastkey ? lastkey.slice(0,-2) : lastkey;
  let beforelast = splitted.reduce((a,b) => {
    return isAssignable(a) && a[b];
  }, obj);
  return isAssignable(beforelast) ? (isFnCallLastkey ? beforelast[lastkey](...args) : beforelast[lastkey]) : undefined;
};

module.exports.s = (key, value, original) => {
  if (typeof key !== 'string') throw new Error(`Cannot set a value with a non-string property name, got ${typeof key}`);
  let obj = doNotErase ? Object.assign({},original) : original;
  key.split('.').reduce(function(o, s, i, arr) {
  	return (i == arr.length-1) ? o[s] = value : o[s] = Object.assign( (isObj(o[s]) ? o[s] : {}) ,{});
   }, (() => {
   if (obj === null) return obj = {};
  	if (isUndefOrPureObj(obj)) {
    	if (obj === undefined) { return obj = {}; } else { return obj; }
    }
    return obj;
  })() );
  return obj;
};
