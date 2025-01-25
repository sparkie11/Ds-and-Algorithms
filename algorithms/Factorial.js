      const Factorial = (n) =>{
    if (n == 1 || n == 0 ) {
        return 1
    }

    return (n *  Factorial(n-1));


}


const val = Factorial(5);

console.log(val,'ff');