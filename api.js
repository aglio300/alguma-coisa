const privateKey = "6a569a62c2c9b67a8b7c867c7f1f776a1ed0a797";
const publicKey = "5b1b8dbea55c92ec53b3d0da891c0b1d";

const baseURL = 'http://gateway.marvel.com/v1/public';

const imgContainer = document.querySelector('.img-container');
const characterName = document.querySelector('.character-name');
const characterDescription = document.querySelector('.description');
const characterImg = document.getElementById('character-img');


const getCharacter = function(event,form) {
event.preventDefault();
const charName = form.charName.value;
let ts = Date.now();

let hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

let queryString = `${baseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${charName}`;

fetch(queryString).then(response =>{
    response.json().then(jsonData =>{
        console.log(jsonData.data.results[0]);
        const Name = jsonData.data.results[0].name;
        const imageURL = jsonData.data.results[0].thumbnail.path;
        const imageExtention = jsonData.data.results[0].thumbnail.extension;
        const imgSrc = `${imageURL}.${imageExtention}`;
        //const imgElement = document.createElement('img');
        characterImg.src = imgSrc;
        characterImg.alt = Name;
        //imgContainer.innerHTML = '';
        //imgContainer.appendChild(imgElement);
        characterName.textContent = Name
        characterDescription.textContent = jsonData.data.results[0].description;
    })
})
}