function $(text){
    return document.querySelector(text)
}

const pagesBtns = document.querySelectorAll('.object__page')
const recordsList = $('.objects__items')

pagesBtns.forEach(pageBtn => {
    pageBtn.addEventListener('click', () => {
        pagesBtns.forEach( page =>  page.classList.remove('active'))
        pageBtn.classList.add('active')
        getRecords(pageBtn.innerHTML)
    })
})
// Ajax запрос новой страницы
function getRecords(page){
    URL = 'https://jsonplaceholder.typicode.com/comments/'
    // ВОТ ТУТ ССЫЛКУ ИЗМЕНИШЬ НА ЧЕТ ТАКОЕ
    // URL = `https://jsonplaceholder.typicode.com/comments?page=${page}`

    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok){             
                // Удаление старых комментариев из списка
                recordsList.innerHTML = ''   
                return response.json()
            }
            else
                console.error('Ошибка получения данных');
        }).then( records => {
            records.map( record => generatePage(record))
        })
}

// генерация HTML кода(отображение новых записей) 
function generatePage(record){
    let recorlElement = document.createElement('li')
    recorlElement.classList.add('objects__item')
    recorlElement.innerHTML = `
        <a href="${record.link}" class="object"><p>${record.name}</p></a>
    `
    recordsList.append(recorlElement)
}