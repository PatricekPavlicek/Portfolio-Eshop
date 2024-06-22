const sortButtons = document.querySelectorAll('.li-btn');

sortButtons.forEach(button =>{
    button.onclick = function(){
        sortButtons.forEach(otherButton =>{
            otherButton.classList.remove('li-btn-selected');
        })

        button.classList.add('li-btn-selected');
    }
})