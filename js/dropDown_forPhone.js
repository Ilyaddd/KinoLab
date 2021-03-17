// Закрытие дропдаун меню по клику на мобилках
function closeChoice(choice){
    const wrapper = choice.querySelector('.main__filter_wrapper')
    if (wrapper.clientHeight > 0)
        wrapper.classList.add('squeeze')
    else
        wrapper.classList.remove('squeeze') 
}

document.querySelectorAll('.main__filter_choice').forEach( el => {
    el.addEventListener('touchstart', function() {
        let menuHeight = this.querySelector('.main__filter_wrapper').clientHeight          
        closeChoice(this)                    
    })
})