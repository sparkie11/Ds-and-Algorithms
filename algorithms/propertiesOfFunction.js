// Define a function
function myFunction() {
    console.log("Hello from myFunction!");
}

// Add properties to the function
myFunction.description = "This is a function that logs a greeting message to the console.";
myFunction.counter = 0;

// Modify the function to update the counter property each time it's called
const originalFunction = myFunction; // Store the original function
myFunction = function() {
    myFunction.counter++;
    originalFunction();
    console.log(`Counter is now: ${myFunction.counter}`);
};

// Call the function
myFunction();
console.log(myFunction.description); // Logs: This is a function that logs a greeting message to the console.
console.log(myFunction.counter);     // Logs: 1

// Call the function again
myFunction();
console.log(myFunction.counter);     // Logs: 2
