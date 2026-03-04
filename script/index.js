const synonyms = (arr) =>{
    const newArr = arr.map((el)=>`<span class="btn">${el}</span>`);
    return newArr.join("");
}

const loadSpinner =(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("z-index:-999");
    }

    else {
        document.getElementById("word-container").classList.remove("z-index:--999");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json)=>disPlayLesson(json.data))
}

const removeActive=()=>{
    const lessonBtns = document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach((btn)=>btn.classList.remove('active'));
}

const loadLevelWord = (id) =>{
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        disPlayLevelWord(json.data)});
}

const wordDetails =  async(wordId) =>{
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.data);

}

// {
// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
// }

const displayDetails = (word) =>{
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
          <div>
            <h3 class="font-bold text-xl">Meaning</h3>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div>
            <h3 class="font-bold text-xl">Example</h3>
            <p>${word.sentence}</p>
          </div>
          <div class="space-y-2">
            <h3 class="font-semibold text-xl">সমার্থক শব্দ গুলো</h3>
            <div class="space-x-2">${synonyms(word.synonyms)}</div>
            
          </div>
    `
    

    document.getElementById("word_modal").showModal();
}


const disPlayLevelWord = (words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML='';

    if(words.length==0){
        wordContainer.innerHTML=`
        <div class="font-bangla col-span-full text-center rounded-xl space-y-8">
        <img class="mx-auto" src="./assets/alert-error.png" alt="Alert Image" >
        <p class="text-gray-400 font-medium text-xl"> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
        <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>
        `;
        loadSpinner(false);
        return;
    }
    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm py-10 px-8 text-center space-y-3">
        <h2 class="font-bold text-2xl">${word.word? word.word:"Not Available"}</h2>
        <p class="font-semibold">Meaning/Pronounciation</p>
        <div class="font-bangla  text-2xl">"${word.meaning? word.meaning:"Not Available"} / ${word.pronunciation? word.pronunciation:"Not Available"}"</div>

        <div class="flex items-center justify-between">
        <button onclick="wordDetails(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        `;

        wordContainer.append(card);
    });
    loadSpinner(false);
}
const disPlayLesson = (lessons) =>{
    //01 get the container and make it empty
    const levelContainer = document.getElementById('level-container');
    //levelContainer.innerHTML='';
    for(let lesson of lessons){
         //02 Create Element 
         const btnDiv = document.createElement('div');

         //03 Set innerHTML
         
         btnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="#" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
              >`;

              //04 Append
              levelContainer.appendChild(btnDiv);

    }
    
}
loadLessons();
