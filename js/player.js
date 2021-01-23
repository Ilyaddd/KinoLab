document.addEventListener('DOMContentLoaded', function () {

    // Начало меню бургера
    document.querySelector('.header-burger').addEventListener('click', function(){
        document.querySelector('.header-burger').classList.toggle('active')
        document.querySelector('.header-menu-wrapper').classList.toggle('active')
        document.querySelector('body').classList.toggle('lock')
    })
    // Конец меню бургера
 
    document.querySelector('#start').addEventListener('click', togglePlay)
    document.querySelector('#volume').addEventListener('click', toggleSound)
    document.querySelector('#screen').addEventListener('click', toggleFullScreen)
        
    const wrapper = document.querySelector('.player__wrapper')
    const video = document.querySelector('#player')
    const hotKeysHolder = document.querySelector('#hotkeys-holder')
    const progress = document.querySelector('#player-progress')
    const remote = document.querySelector('.remote__wrapper')
    const popup = document.querySelector('#info-holder')

    const startImg = document.querySelector('#start-img')
    const volumeImg = document.querySelector('#volume-img')
    const screenImg = document.querySelector('#screen-img')
    const curSpeed = document.querySelector('#speed')

    hotKeysHolder.select

    video.addEventListener('timeupdate', progressUpdate)
    video.addEventListener('loadedmetadata', takeMetaData)
    hotKeysHolder.addEventListener('click', togglePlay)
    hotKeysHolder.addEventListener('contextmenu', e => {
        e.preventDefault()
        toggleFullScreen()
    })
    hotKeysHolder.addEventListener('keydown', useHotKeys)
    remote.addEventListener('contextmenu', e => e.preventDefault())

    // Преобразование секунд в минуты и часы
    function toNormalTime(d) {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
    
        let hDisplay = h > 0 ? h + ':' : "";
        let mDisplay = m > 0 ? m + ':' : "0:";
        let sDisplay = s > 0 ? s > 9 ? s: `0${s}` : '00'
        return hDisplay + mDisplay + sDisplay; 
    }
    // Округление цифр
    function rounding(num){
        return Math.round(num*100)
    }

    // Включениe/остановка видео
    function togglePlay(){
        if(video.paused){
            video.play()
            startImg.setAttribute('src', 'img/player/pause.svg')
        }
        else{
            video.pause()
            startImg.setAttribute('src', 'img/player/play.svg')
        }
    }

    // Изменение звука
    function changeSound(up){   
        video.muted = false
        let volume = video.volume

        if (up){
            if (volume <= 0.95)
                video.volume = volume + 0.05
            else
                video.volume = 1
            volumeImg.setAttribute('src', 'img/player/volume_on.svg')            
        } 
        else {
            if (volume > 0.05)
                video.volume = volume - 0.05
            else{
                video.volume = 0
                volumeImg.setAttribute('src', 'img/player/volume_off.svg')
            }
        }
        showInfo(`Звук: ${rounding(video.volume)}%`)
        
    }
    // Включить/выключить звук
    function toggleSound(){
        if(video.muted){
            video.muted = false
            volumeImg.setAttribute('src', 'img/player/volume_on.svg')
            showInfo(`Звук: ${rounding(video.volume)}%`)               
        }
        else{
            video.muted = true
            volumeImg.setAttribute('src', 'img/player/volume_off.svg')
            showInfo('Звук: 0%')   
        }
    }
    
    // Изменение скорости
    function changeSpeed(speed){
        let pbRate = video.playbackRate
        if (pbRate > 0.15 && pbRate < 5)
            video.playbackRate += speed
        else if (pbRate > 0)
            video.playbackRate += speed
        
        showInfo(`Скорость: ${Math.round((pbRate + speed) * 100) / 100}x`)
    }    

    // При движении полоски видео        
    const pLine = document.querySelector('.progress-line')
    const pDuration = document.querySelector('.progress-duration')
    const pBuffered = document.querySelector('.progress-buffered')
    const pBtn = document.querySelector('.progress-btn')
    const pJumpBtn = document.querySelector('.progress-jump-line')

    function progressUpdate(){
        const lWidth = pLine.clientWidth
        const c = video.currentTime // Текущее время видео
        const d = video.duration // Длина видео
        const b = video.buffered.end(0) // Сколько секунд видео загрузилось
        const pSec = d / 100 // колличество секунд в 1% видео
        // Движение полоски проигрывания видео
        pDuration.style.transform = `scaleX(${c / pSec / 100})`
        // Движение полоски загрузки видео
        pBuffered.style.transform = `scaleX(${b / pSec / 100})`
        // Движение бегунка
        pBtn.style.transform = `translateX(${c * pSec * lWidth / 100}px)`
        // Обновление времени
        document.querySelector('#curren-time').innerHTML = toNormalTime(video.currentTime)
    }
    // Клики для перемотри видео    
    pJumpBtn.addEventListener('click', videoRewind)

    function videoRewind(){
        let w = this.offsetWidth
        let o = event.offsetX
        video.pause()
        video.currentTime = video.duration * (o / w)
        video.play()
    }

    // Открыть/закрыть видео во весь экран
    function toggleFullScreen(){
        if(!document.fullscreenElement){
            screenImg.setAttribute('src', 'img/player/not_full_screen.svg')
            wrapper.requestFullscreen()
        }
        else{
            screenImg.setAttribute('src', 'img/player/full_screen.svg')
            document.exitFullscreen()
        }
    }

    // Получение метаданных при загрузке страницы
    function takeMetaData(){
        // Запись нужного колличества нулей в зависимости от длинны видео
        const cTime = document.querySelector('#curren-time')
        const dur = video.duration
        cTime.innerHTML = dur > 36000 ? '00:00:00' : dur > 3600 ? '0:00:00' : dur > 600 ? '00:00' :  '0:00'
        
        document.querySelector('#full-time').innerHTML = toNormalTime(video.duration)
    }

    // Хоткеи
    function useHotKeys(e){
        e.preventDefault()
        let cTime = video.currentTime

        // Старт/стоп видео (Space || Enter)
        if (e.keyCode == '32' || e.keyCode == '13') {
            togglePlay()
        }
        // Видео на 5 секунд назад (Right click)
        if (e.keyCode == '37') {
            video.currentTime = cTime - 5
        }
        // Видео на 5 секунд вперёд (Left click)
        if (e.keyCode == '39') {
            video.currentTime = cTime + 5
        }
        // Прибавить звук на 5% (Up click)
        if (e.keyCode == '38'){
            changeSound(true)
        }
        // Убавить звук на 5% (Down click)
        if (e.keyCode == '40'){
            changeSound(false)
        }
        // Нормальный звук
        if (e.keyCode == '78'){
            video.volume = 1
            showInfo('Звук: 100%')
        }
        // Включить/выключить звук
        if (e.keyCode == '77'){
            toggleSound()
        }
        // Увеличить скорость воспроизведения видео
        if (e.keyCode == '190'){
            changeSpeed(0.1)
        }
        // Уменьшить скорость воспроизведения видео
        if (e.keyCode == '188'){
            changeSpeed(-0.1)
        }
        // Нормальная скорость
        if (e.keyCode == '83'){
            video.playbackRate = 1
            showInfo('Скорость: 1.0x')
        }
        // Включить/выключить полноэкранный режим        
        if (e.keyCode == '70'){
            toggleFullScreen()
        }

        // Отматать видео в начало
        if (e.keyCode == '48' || e.keyCode == '96'){
            video.currentTime = 0
        }
        
        /* Промотка видео на проценты */
        const vidDur = video.duration
        function jumpTo(num){
            video.currentTime = vidDur / 100 * num
        }

        // 10%
        if (e.keyCode == '49' || e.keyCode == '97'){
            jumpTo(10)
        }
        // 20%
        if (e.keyCode == '50' || e.keyCode == '98'){
            jumpTo(20)
        }
        // 30%
        if (e.keyCode == '51' || e.keyCode == '99'){
            jumpTo(30)
        }
        // 40%
        if (e.keyCode == '52' || e.keyCode == '100'){
            jumpTo(40)
        }
        // 50%
        if (e.keyCode == '53' || e.keyCode == '101'){
            jumpTo(50)
        }
        // 60%
        if (e.keyCode == '54' || e.keyCode == '102'){
            jumpTo(60)
        }
        // 70%
        if (e.keyCode == '55' || e.keyCode == '103'){
            jumpTo(70)
        }
        // 80%
        if (e.keyCode == '56' || e.keyCode == '104'){
            jumpTo(80)
        }
        // 90%
        if (e.keyCode == '57' || e.keyCode == '105'){
            jumpTo(90)
        }
        /* Промотка видео на проценты (конец) */
    }

    // Показать информацию в попупе
    function showInfo(text){
        popup.innerHTML = text
        popup.classList.add('active')
        setTimeout(() => {
            popup.classList.remove('active')
        }, 600)
    }



})

/// Скорость стрелочками
/// Инфа https://metanit.com/web/html5/7.3.php

/// Старт/стоп по левому клику
/// Открыть в фул экран по правому клику
/// Старт/стоп (пробел и энтер)
/// Видео вперёд/назад на 5 сек (стрелочки влево/вправо)
/// Прибавить/убавить звук на 5% (стрелочки вверх/вниз)
/// Увеличить/уменьшить скорость воспроизведения видео на 0.1% (знак меньше/больше)
/// Отмотать видео в самое начало (кнопка ноль)
/// Отмотать видео на 10,20,30,40,50,60,70,80,90 процентов (кнопки 1,2,3,4,5,6,7,8,9)
/// Скорость 1.0x (клавиша S)
/// Звук 100%  (клавиша N)
/// Вкл/выкл звук (клавиша M)
/// Вкл/выкл фул скрин (клавиша F)

// Настроить фокус, что бы всегда работали хоткеи(('keydown', useHotKeys) для всего)
// Настроить нормально отображение скорости
// Настроить попуп, что бы нормально скрывался
// Починить remote в фул скрин режиме