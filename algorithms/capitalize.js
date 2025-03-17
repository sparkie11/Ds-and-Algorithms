function capitalise(paragraph) {

  const arr = paragraph.split('')
  // console.log(arr,"check")
  for (let i=0 ; i< arr.length; i++ ){

    if(arr[i] == "."  || arr[i] == " " ){
      continue;
    }

    if(i = 0 || arr[i-1] == " " ){
        arr[i] = arr[i].toUpperCase()

    }

  }
  return arr.join("")
}


const paragraph = " Hello my name is gautam  ."

//capitalize the first letter of each word
