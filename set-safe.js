// Utils
const isUndefOrPureObj = function (obj) {
  return obj === undefined || (obj !== null && typeof obj === 'object' && !Array.isArray(obj));
};

const isObj = function (obj) {
  return obj !== null && typeof obj === 'object';
};

/*
 * @param {key} string concatenation of nested keys in this form: 'foo.bar.toto'.
 * @param {value} the value we are setting on this object
 * @param {originalObj} [optional] the object we are altering
 * @param {doNotErase} [optional] a boolean value that says if we shall create a copy of the altered objet
 *    or work on the original one
 * @return the altered object
 */
module.exports = (key, value, originalObj, doNotErase) => {
  if (typeof key !== 'string') throw new Error(`Cannot set a value with a non-string property name, got ${typeof key}`);
  let obj = doNotErase ? Object.assign({},isObj(originalObj) ? originalObj : {}) : originalObj;
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
