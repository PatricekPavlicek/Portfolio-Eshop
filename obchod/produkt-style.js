const backgroundImageFolderPath = '/front-end/resources/produkt/'

const blackArrowPath = backgroundImageFolderPath + 'arrow-black.png'
const whiteArrowPath = backgroundImageFolderPath + 'arrow-white.png'

const minUnderlineWidth = getUnderlineWidth();

const font = '26px Segoe UI';


//styleButtons();
styleDescriptionButtons();
setAmountButtons();

// Dynamicaly changing buttons hover styling
function styleButtons(){
    const buttons = [
        {
            btn: document.querySelector('.left-image-button'),
            img: document.querySelector('.left-image-button img')
        },
        {
            btn: document.querySelector('.right-image-button'),
            img: document.querySelector('.right-image-button img')
        }
    ];
    
    buttons.forEach(button => {
        button.btn.onmouseenter = function(){
            button.img.src = whiteArrowPath;
        }
    
        button.btn.onmouseleave = function(){
            button.img.src = blackArrowPath;
        }
    });
}

// Smooth scroll to description

document.querySelector('.simple-description-container p span a').addEventListener('click', function(){
    document.getElementById('description').scrollIntoView();
})

// Description 'display-more' buttons hover styling + show more 
function styleDescriptionButtons(){
    const description_buttons = document.querySelectorAll('.component-list .component .component-heading .btn-display-more');
    const description_buttons_images = document.querySelectorAll('.component-list .component .component-heading .btn-display-more img');
    const description_component_details = document.querySelectorAll('.component-list .component .component-details');
    const description_component_details_showing = [];

    for(let i = 0; i < description_buttons.length; i++){
        description_component_details_showing.push(false);

        description_buttons[i].onmouseenter = function(){
            description_buttons_images[i].src = whiteArrowPath;
        };

        description_buttons[i].onmouseleave = function(){
            description_buttons_images[i].src = blackArrowPath;
        }

        description_buttons[i].onclick = function(){
            // Hide description
            if(description_component_details_showing[i]){
                description_component_details_showing[i] = false;
                description_buttons[i].style.transform = 'rotate(90deg)';

                hideDescription(description_component_details[i], description_buttons[i].parentElement.style);
            }
            // Show Description
            else{
                description_component_details_showing[i] = true;
                description_buttons[i].style.transform = 'rotate(270deg)';

                showDescription(description_component_details[i], description_buttons[i].parentElement.style);
            }
        }
    }
}

function showDescription(description, underlineStyle){
    description.style.display = 'block';
    description.style.opacity = 0;
    description.style.height = 'auto';

    const maxHeight = description.offsetHeight;
    let currentHeight = 0;

    // Get text width of description's inner text
    const maxUnderlineWidth = getTextWidth(description.parentElement.innerText.split(':')[0]);
    const underlineIncrement = 4;
    currentUnderlineWidth = getUnderlineWidth();

    const sizeIncrement = 7;
    const intervalDuration = 7;

    const increaseUnderline = setInterval(function(){
        if(currentUnderlineWidth >= maxUnderlineWidth){
            clearInterval(increaseUnderline);
        }
        else{
            currentUnderlineWidth += underlineIncrement;
            underlineStyle.setProperty('--underline-width', currentUnderlineWidth + 'px');
        }
    }, intervalDuration);

    const increaseHeight = setInterval(function() {
        if (currentHeight >= maxHeight) {
            // Stop interval
            clearInterval(increaseHeight);
            description.style.opacity = 1;
        }
        else {
            currentHeight += sizeIncrement;
            if (currentHeight > maxHeight) {
                currentHeight = maxHeight;
            }
            description.style.height = currentHeight + 'px';
        }
    }, intervalDuration);
}

function hideDescription(description, underlineStyle){
    const minHeight = 0;
    let currentHeight = description.offsetHeight;
    description.style.opacity = 0;

    const underlineDecrement = 4;
    currentUnderlineWidth = getTextWidth(description.parentElement.innerText.split(':')[0]);

    const sizeDecrement = 7;
    const intervalDuration = 7;
    
    const decreaseUnderline = setInterval(function(){
        if(currentUnderlineWidth <= minUnderlineWidth){
            clearInterval(decreaseUnderline);
        }
        else{
            currentUnderlineWidth -= underlineDecrement;
            underlineStyle.setProperty('--underline-width', currentUnderlineWidth + 'px');
        }
    }, intervalDuration)

    const intervalDecrease = setInterval(function() {
        if (currentHeight <= minHeight) {
            clearInterval(intervalDecrease);
            description.style.display = 'none';
            description.style.opacity = 1;
        }
        else {
            currentHeight -= sizeDecrement;
            if (currentHeight < 0) {
                currentHeight = 0;
            }
            description.style.height = currentHeight + 'px';
        }
    }, intervalDuration);
}

function setAmountButtons(){
    var button_minus = document.getElementById('substract');
    var button_plus = document.getElementById('add');
    const amount_container = document.getElementById('selected-amount-number');

    button_minus.onclick = function(){
        var currentNumber = amount_container.innerText.replace('Ks', '').trim();
        if(currentNumber > 1){
            currentNumber -= 1;
            amount_container.innerText = currentNumber + ' Ks';
        }
    }

    button_plus.onclick = function(){
        var currentNumber = parseInt(amount_container.innerText.replace('Ks', '').trim());
        if(currentNumber < parseInt(document.querySelector('.right .amount').innerText.replace('Skladem', '').replace('Ks', '').trim()))
        currentNumber += 1;
        amount_container.innerText = currentNumber + ' Ks';
    }
}

function getUnderlineWidth(){
    return parseInt(getComputedStyle(document.querySelector('.component')).getPropertyValue('--underline-width').replace('px', '').trim());
}

function getTextWidth(text) {
    // Create a dummy element
    var element = document.createElement('canvas');
    var context = element.getContext('2d');
    context.font = font;

    // Get the dummy's element width
    var width = Math.round(context.measureText(text).width);
    return width;
}