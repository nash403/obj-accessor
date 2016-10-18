const _ = require ('./get-safe');
const toto = {
  foo: {
    bar: {
      baz: ['winter','is','coming'],
      fifo (arg1, arg2) {
        console.log("I'am a function, arguments are:",...arguments);
        return 42;
      }
    },
    astring: "John Doe"
  }
};

// Tests
console.log('The tested object is:', JSON.stringify(toto));
console.log('- Accessing to toto.foo.bar.baz.2');
console.log(_('foo.bar.baz.2',toto)); // logs 'coming'
console.log('- Accessing to toto.foo.bar.fifo() and calling the fifo function');
console.log(_('foo.bar.fifo()',toto,'arg1','arg2')); // calls the nested function 'fifo' and logs its result (42)
console.log('- Accessing to toto.foo.inexistant.property.baz, should log "undefined"');
console.log(_('foo.inexistant.property.baz',toto)); // logs 'undefined'
console.log('- Accessing to toto.foo.astring.substring(5), should log "Doe"');
console.log(_('foo.astring.substring()',toto,5)); // logs 'Doe'


// var array = [''];
// var object = {
//   opt1:{
//     sub1:{
//       subsub1:78
//     }
//   }
// };
// console.log('before:',JSON.stringify(object,null,2));
// /*array.reduce(function(o, s, i, arr) {
// 	return (i == arr.length-1) ? o[s] = "ma" : o[s] = Object.assign(isObj(o[s])?o[s] : {},{});
//  }, (() => {
//  if (object === null) return object = {};
// 	if (isUndefinedOrObj(object)) {
//   	if (object === undefined) { return object = {}; } else { return object; }
//   }
//   return object;
// })());*/
// let s = (key, value, obj) => {
// if (typeof key !== 'string') {throw new Error("Error: Cannot set property of an object with a non-string key");}
//   key.split('.')reduce(function(o, s, i, arr) {
//   	return (i == arr.length-1) ? o[s] = value : o[s] = Object.assign( (isObj(o[s]) ? o[s] : {}) ,{});
//    }, (() => {
//    if (obj === null) return obj = {};
//   	if (isUndefOrPureObj(obj)) {
//     	if (obj === undefined) { return obj = {}; } else { return obj; }
//     }
//     return obj;
//   })() );
//   return obj;
// };
// //s(array.join('.'),2, object);
// //console.log('after:',JSON.stringify(object,null,2));
// console.log('after:',JSON.stringify(s(array,2),null,2));
// //console.log(Object.assign(4,{}));
// //console.log(s('foo.bar',tt,1))
