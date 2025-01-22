                       function FlattenArray(nestedArray) {
    let newArray=[];
    StoreInArray(nestedArray)
    function StoreInArray(arrayVal){
        for(let i=0; i< arrayVal.length; i++){
            if(!Array.isArray(arrayVal[i])){
                newArray.push(arrayVal[i])
                }else{
                StoreInArray(arrayVal[i])

                }
            }
        

    }

}


const nestedArray = [ 1,2 ,[3,5,6], [1,5,6,2,3],4]
const val = FlattenArray(nestedArray);

console.log(val,'get the value of the array');
