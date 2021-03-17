function $(el){
    return document.querySelector(el)
}

btn = $('#more-btn')
previewList = $('.wrapper__preview')

// Ajax запрос новых фильмов
function getData(){
    // Подсчёт загруженных фильмов для правильного ajax запроса
    number = document.querySelectorAll('.preview').length
    URL = 'https://jsonplaceholder.typicode.com/photos/'

    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok)
                return response.json()
            else
                console.error('Ошибка получения данных');
        }).then( films => {
            // Подсчёт, сколько фильмов загружено, что бы парсить следующие 8 штук
            films = films.slice(number - 9, --number)
            films.map( film => generatePreview(film))
        })

}

// генерация HTML кода(добавление новых фильмов) 
function generatePreview(film){
    let preview = document.createElement('div')
    preview.classList.add('preview')
    preview.innerHTML = `
    <a href="#" class="card__wrapper">
    <div class="preview__info">                        
        <img src="${film.url}" class="card__pic">
        <div class="card__rating">
            <p>${film.id}</p>
        </div>
    </div>
    <div class="preview__popup">
        <h4 class="preview__popup-title">${film.title}</h4>
        <h5 class="preview__popup-genre">${film.thumbnailUrl}</h5>
    </div>
</a>
    `
    previewList.append(preview)
}

btn.addEventListener('click', () => {
    getData()
})
