// Write a function createCounter. It should accept an initial integer init. It should return an object with three functions.

// The three functions are:

// increment() increases the current value by 1 and then returns it.
// decrement() reduces the current value by 1 and then returns it.
// reset() sets the current value to init and then returns it.

var createCounter = function(init) {
    let current = init;
    return{
        increment: function() {
            current++;
            return current
            
        },
        decrement: function() {
            current--;
            return current
        },
        reset: function() {
            current = init;
            return current
        }

    }
    
};


var counter = createCounter(5)
// counter
console.log(counter.increment()); //