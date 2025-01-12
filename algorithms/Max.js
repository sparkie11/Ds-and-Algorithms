 const Maximum = (numberArray) => {
    
    let max = numberArray[0];
    for(let i=1 ;i<numberArray.length;i++){
        if( max  <=  numberArray[i] ){
            max = numberArray[i] 
        } }
        return max;

}

const data = [1,3,5,6,7,4,5]
var val= Maximum(data)

console.log(val,'dsf');
