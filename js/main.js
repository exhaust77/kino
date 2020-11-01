


function films(){

    
const filmName = document.getElementById('input-film').value;
const request = 'https://api.tvmaze.com/search/shows?q=';
const requestUrl = request + filmName;
console.log(requestUrl)
const searchResult = document.getElementById('search-result');

searchResult.innerText = "Результаты по запросу " + filmName;

const dataWrapper = document.getElementById('data-wrapper');

if (filmName) {
const createTemplate = data => {
    let genres = [];

    if (data.show.genres.length){
        genres = data.show.genres.reduce((acc,item) => {
            return acc + ", " + item;
        })
    } else {
        genres = "unknown"
    }

    return `
    <div class="data-item">
        <div class="image">
            <img src="${data.show.image ? data.show.image.medium : ''}" alt="">
        </div>
        <div><span>Name:${data.show.name}</span></div>
        <div><span>Score:${data.score}</span></div>
        <div><span>Genres:${genres}</span></div>
        <div><span>Language:${data.show.language}</span></div>
        <div><span>Description:${data.show.summary}</span></div>
    </div>
    `
}
    fetch(requestUrl)
    .then(dataWrapper.innerHTML = '')
    .then(response => response.json())
    .then(data => {
        if(data) {
            data.forEach(item => {
                dataWrapper.innerHTML += createTemplate(item);
            })
        }
    })
} else
{
    searchResult.innerText = "Пустой запрос";
}


}
