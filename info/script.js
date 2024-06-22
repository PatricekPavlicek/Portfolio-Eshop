const cards_top = document.querySelectorAll('#service-description .card');
const paragraphs_top = document.querySelectorAll('#service-description .paragraph');

const cards_bottom = document.querySelectorAll('#telecorp-description .card');
const paragraphs_bottom = document.querySelectorAll('#telecorp-description .paragraph');

textSelectorSetup();

function textSelectorSetup(){
    for(let i = 0; i < cards_top.length; i++){
        cards_top[i].onclick = function(){
            changeVisibleParagraph(paragraphs_top, paragraphs_top[i], cards_top, cards_top[i], true);
        }
    }

    for(let i = 0; i < cards_bottom.length; i++){
        cards_bottom[i].onclick = function(){
            changeVisibleParagraph(paragraphs_bottom, paragraphs_bottom[i], cards_bottom, cards_bottom[i], true);
        }
    }

    changeVisibleParagraph(paragraphs_top, paragraphs_top[0], cards_top, cards_top[0], false);
    changeVisibleParagraph(paragraphs_bottom, paragraphs_bottom[0], cards_bottom, cards_bottom[0], false);
}

function changeVisibleParagraph(paragraphArray, paragraph, cardArray, card, scroll){

    // Remove all previous cards stylings
    cardArray.forEach(item =>{
        item.classList.remove('selected-card');
    });

    // Style requested card
    card.classList.add('selected-card')

    // Hide all paragraphs
    paragraphArray.forEach(item =>{
        item.style.display = 'none';
    });

    // Display requested paragraph
    paragraph.style.display = 'block';


    if(scroll){
        // Check if the device width is phone, if so, scroll to the paragraph rather than the card
        if(Math.min(screen.width, window.innerWidth) <= 768){
            // Scroll slightly above the card
            window.scrollTo({
                behavior: 'smooth',
                top: paragraph.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 200
            });
        }
        else{
            // Scroll slightly above the paragraph
            window.scrollTo({
                behavior: 'smooth',
                top: card.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 20
            });
        }
    }
}