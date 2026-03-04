const synonyms = (arr) =>{
    const newArr = arr.map((el)=>`<span class="btn">${el}</span>`);
    return newArr.join("");
}

const arr1 = ["apple","Mango","Litchi"];
console.log(synonyms(arr1));