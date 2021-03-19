function $(text){
    return document.querySelector(text)
}
const fFile = $('#film__file')
const fTitle = $('#film__title')
const pFile = $('#poster__file')
const pTitle = $('#poster__title')
const bFile = $('#banner__file')
const bTitle = $('#banner__title')

function uploadFIle(file, title){
    title.innerHTML = file.value.split('\\').pop()
}
fFile.addEventListener('change', () => {
    uploadFIle(fFile, fTitle)
})
pFile.addEventListener('change', () => {
    uploadFIle(pFile, pTitle)
})
bFile.addEventListener('change', () => {
    uploadFIle(bFile, bTitle)
})

// Вызов диалогового окна для фильма
$('#film__btn').addEventListener('click', () => {
    $('#film__file').click()
})

// Вызов диалогового окна для постера
$('#poster__btn').addEventListener('click', () => {
    $('#poster__file').click()
})

// Вызов диалогового окна для баннера
$('#banner__btn').addEventListener('click', () => {
    $('#banner__file').click()
})