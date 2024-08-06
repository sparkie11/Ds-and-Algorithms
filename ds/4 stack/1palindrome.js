                                                                                                           // functions  push pop peek length
// functions



// arrays are example of stack 
 
 
var letters =[];

var word="racecar"

var rword = "";


// lets put the word into the stack 

for (var i=0; i < word.length;i++){
    letters.push(word[i])
}

for (var i=0; i < word.length;i++){
    rword += letters.pop();
}

if(rword === word){
    console.log('it is palindrome');
}
else{
    console.log('not');
}
