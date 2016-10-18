# set-safe
#### Safely set value at property, create intermediate properties if necessary, without getting an Error if a parent is undefined.
***
You can even whether alter the original object or create an altered copy of it.
***
#### Install:
`npm install set-safe --save`

#### How to use
 ```JavaScript

 const set = require ('set-safe');
 const toto = {
   foo: {
     bar: {
       baz: ['winter','is','coming'],
       fifo (arg1, arg2) {
         return 42;
       }
     },
     astring: "John Doe"
   }
 };

 // Tests
 let i = 1;
 console.log('The tested object is:', JSON.stringify(toto));

 console.log(`\nExample ${i}:\n`,
   JSON.stringify(set('foo.bar.baz.2','there', toto))); // sets "coming" to "there"

 console.log(`\nExample ${++i}:\n`,
   JSON.stringify(set('foo.astring','Leonardo Di Caprio', toto))); // sets "astring" property

 console.log(`\nExample ${++i}:\n`,
     JSON.stringify(set(['opt1','sub1','subsub1','subsubsub1'].join('.'),'a value'))); // creates a new object with nested props

 console.log(`\nExample ${++i}:\n`,
     JSON.stringify(set('foo.inexistant.property',42,toto))); // adds a new property

 console.log(`\nExample ${++i}:\n`,
     JSON.stringify(set('foo.bar.baz.fifo',42,toto, true)), ' - ',JSON.stringify(toto)); // creates an altered copy of toto object
```
The browser version adds `setSafe` to the *window* object.
