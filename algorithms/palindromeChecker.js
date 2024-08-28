const Palindrome = (string) =>{

    var string2 = string.toLowerCase().split("").reverse().join("");

    if (string.toLowerCase() == string2.toLowerCase()){
        return "palindrome"
    }else {
        return  " Not palindrome"

    }




}

const Val = Palindrome("Nevene");

console.log(Val,'adsfadsf');