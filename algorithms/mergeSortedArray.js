function mergeSortedArray(array1,array2){
    // const sorted = array1.split('').sort().join('');
   var merge =array1.concat(array2);
    const sorted = merge.sort((a, b) => a - b).join('');
    const variableArray = sorted.split("").map(Number);
    return variableArray;





}

const val = mergeSortedArray([1,4,7,2],[2,1,5,7])

console.log(val,'sortedVal');