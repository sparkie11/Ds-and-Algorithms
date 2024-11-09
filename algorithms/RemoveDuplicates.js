                 // function RemoveDuplicates(numberArray){
//     let newArray =[]
//     newArray.push(numberArray[0])
//     for(let i = 0 ; i <numberArray.length;i++){
//         // if(numberArray[i].includes.newArray)
//         // if (numberArray[i].includes(newArray)) {
//         if (newArray.some(element => numberArray[i].includes(element))) {
//             console.log("yes");

//         }

//     } 
//     return newArray;

// }


// const val =  RemoveDuplicates([1,2,3,4,1,2,4,6,3])

// console.log(val,'duplicates removed');

function RemoveDuplicates(numberArray) {
    let newArray = [];
    
    if (numberArray.length > 0) {
        newArray.push(numberArray[0]);
    }
    
    for (let i = 1; i < numberArray.length; i++) {
        if (!newArray.includes(numberArray[i])) {
            newArray.push(numberArray[i]);
        }
    }
    
    return newArray;
}

const val = RemoveDuplicates([1, 2, 3, 4, 1, 2, 4, 6, 3]);
console.log(val, 'duplicates removed');
