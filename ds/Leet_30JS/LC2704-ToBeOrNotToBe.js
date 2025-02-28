var expect = function(val) {
    console.log(val)
return {
    toBe: function(expectedVal) {
        if (val === expectedVal) {
            return true;
        } else {
            throw new Error("Not Equal");
        }

    },
    notToBe: function(expectedVal) {
        if (val !== expectedVal) {
            return true;
        } else {
            throw new Error("Equal");
        }

    },
}


    
};

var hello = expect(5).notToBe(15)

console.log(hello,"hello")