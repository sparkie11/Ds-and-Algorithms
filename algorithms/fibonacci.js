const fibonacci = (n) => {
    if (n == 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}


const val =fibonacci(3);

console.log(val,'val');


4   +   3

3    +    2

2      +  1


1        +  0