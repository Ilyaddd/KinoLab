function $(el){
    return document.querySelector(el)
}

btn = $('#more-btn')
commentsList = $('.comments')

// Ajax запрос новых комментов
function getComments(){
    // Подсчёт загруженных комментов для правильного ajax запроса
    let commentsCount = commentsList.querySelectorAll('.comment').length
    URL = 'https://jsonplaceholder.typicode.com/comments/'

    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok)
                return response.json()
            else
                console.error('Ошибка получения данных');
        }).then( comments => {
            // Подсчёт, сколько комменов загружено, что бы парсить следующие 10 штук
            comments = comments.slice(--commentsCount, commentsCount + 10)
            comments.map( comment => generateComment(comment))
        })

}

// генерация HTML кода(добавление новых комментов) 
function generateComment(comment){
    let commentElement = document.createElement('div')
    commentElement.classList.add('comment')
    commentElement.innerHTML = `
        <div class="comment__img_wrapper">
            <img src="img/comment_img.png" class="comment__img">
        </div>
        <div class="comment__name_wrapper">
            <p class="comment__name">${comment.name}</p>        
        </div>
        <time class="comment__time">${comment.email}</time>
        <div class="comment__text_wrapper">
            <p class="comment__text">${comment.body}</p>
        </div>
    `
    commentsList.append(commentElement)
}

btn.addEventListener('click', () => {
    getComments()
})