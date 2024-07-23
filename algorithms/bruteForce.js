                                                                                                    // Given a list of numbers, find two numbers that sum up to a given target and return the product of these numbers.

// Sample input: 



// Some things to consider before solving this problem

// The given list is unsorted
// There are no duplicates of numbers
// Each input should return exactly one solution



// advantages  
// good for small input  
// time complexity    (negative)
var list = [1721, 979, 366, 299, 756, 1456];
var target = 2020;
let product =0;
// let i,j;

function twoProducts(list,target){
    for (let i = 0 ; i < list.length; i++){
        for ( let j=i+1 ; j<list.length; j++){
            // console.log(list[j],list[i]);
            if((list[i] + list[j]) === target  ){
                console.log("pair found" ,list[i] , list[j])
                return list[i] * list[j] ;
            }

        }

    }
    // console.log(i);
}




const answer = twoProducts(list,target)

console.log(answer)
