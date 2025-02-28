               const AnagramChecker = (string1,string2) => {
const sortedStr1 = string1.split("").sort().join("");
const sortedStr2 = string2.split("").sort().join("");

    if (sortedStr1 === sortedStr2) {
        return "YES";
    } else {
        return "NO";
    }
    // return str1;

}

var val= AnagramChecker("str1","str2")

console.log(val,'dsf');
