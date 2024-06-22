styleInputBoxes();
pageSwitchSetup();
switchBillingAddressSetup();

function styleInputBoxes(){
    const inputs = document.querySelectorAll('.input-box input');
    const labels = document.querySelectorAll('.input-box label');

    for(let i = 0; i < inputs.length; i++){

        labels[i].classList.add('label-default');
    
        inputs[i].addEventListener('focus', function(){
            removeAllFromClassList(labels[i]);
            labels[i].classList.add('label-selected');
    
            inputs[i].style.borderBottomColor = '#00A7E1';
        });
    
        inputs[i].addEventListener('blur', function(){
    
            inputs[i].style.borderBottomColor = 'white';
    
            if(inputs[i].value.trim().length > 0){
                removeAllFromClassList(labels[i]);
                labels[i].classList.add('label-filled');
            }
            else{
                removeAllFromClassList(labels[i]);
                labels[i].classList.add('label-default');
            }
        });
    }

    
    function removeAllFromClassList(element){
        while (element.classList.length > 0) {
            element.classList.remove(element.classList.item(0));
        }
    }
}


function pageSwitchSetup(){
    const sc_first = document.querySelector('.sc-first');
    const sc_second = document.querySelector('.sc-second');
    const sc_third = document.querySelector('.sc-third');

    const sc_first_btn_next = document.querySelector('.sc-first .btn-next');
    const sc_third_btn_previous = document.querySelector('.sc-third .btn-previous');

    const nav_card_second = document.getElementById('c2');
    const nav_card_third = document.getElementById('c3');

    sc_first_btn_next.onclick = function(){showSecond();}
    sc_third_btn_previous.onclick = function(){showFirst();}


    showFirst();

    function showFirst(){
        nav_card_second.classList.add('card-selected');
        nav_card_third.classList.remove('card-selected');
        sc_first.style.display = 'block';
        sc_second.style.display = 'none';
        sc_third.style.display = 'none';

        window.scrollTo(0, 0);
    }

    function showSecond(){
        nav_card_second.classList.remove('card-selected');
        nav_card_third.classList.add('card-selected');
        sc_first.style.display = 'none';
        sc_second.style.display = 'flex';
        sc_third.style.display = 'block';  
        
        window.scrollTo(0, 0);
    }
}

function switchBillingAddressSetup(){
    const billing_section = document.getElementById('billing-address');
    const checkbox = document.getElementById('different-address');

    billing_section.style.display = 'none';

    checkbox.onchange = function(){
        if(checkbox.checked){
            billing_section.style.display = 'flex';
        }
        else{
            billing_section.style.display = 'none';
        }
    };
}