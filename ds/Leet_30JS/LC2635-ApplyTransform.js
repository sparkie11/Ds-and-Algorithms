var map = function(arr, fn) {
    const returnedArray = [];
    for (let i = 0; i < arr.length; i++) {
        returnedArray[i] = fn(arr[i]);
    }
    return returnedArray;
};


const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = map(numbers, function(num) {
    
    return num * 2;
});

console.log(doubledNumbers); 