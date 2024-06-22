const file = {
    product_name: 'Kompjůtr 😯',
    short_description: 'Tohle je můj úplný výliv mysli, je to super počítač pro super lidi jako jste určitě vy muhahahaha, běž do piči, the beautiful people the beautiful people its all relative to the size of your steeple',
    img_path: '/front-end/resources/obchod/product-pc.webp',
    rating: 5,
    price: 25000,
    sale: 20000,
    amount: 12,
    tags: ['Child labor 🤫', 'White nibba 🗿', 'Amogus 💫'],
    time_spent_working: '8 years',
    components: 
    [
        {
            component_name: {display_name: 'Procesor', value: 'Intel Core i5-12500'},
            type: {display_name: 'Typ procesoru', value: 'Intel Core i5'},
            integrated_gpu: null,
            generation: {display_name: 'Generace', value: '12'},
            model: {display_name: 'Model', value: '12500'},
            cores: {display_name: 'Počet jader', value: 6},
            threads: {display_name: 'Počet vláken', value: 12},
            frequency: {display_name: 'Frekvence [MHz]', value: 3200},
            web: {display_name: 'Webové stránky procesoru', value: 'https://www.intel.com/'}
        },
        {
            component_name: {display_name: 'Grafická karta', value: 'Nvidia GFeForce RTX 3080'},
            gpu_chip: {display_name: 'Grafický Čip', value: 'GeForce RTX 3080'},
            vram: {display_name: 'Velikost VRAM [MB]', value: 6000},
            memory_type: {display_name: 'Typ paměti', value: 'GDDR6'},
            web: {display_name: 'Webové stránky grafické karty', value: 'https://www.nvidia.com/'}
        },
        {
            component_name: {display_name: 'Operační Paměť', value: 'Kingston Fury 32GB'},
            size: {display_name: 'Velikost', value: '32GB (2x16)'},
            type: {display_name: 'Typ paměti', value: 'DDR5'},
            frequency: {display_name: 'Frekvence [MHz]', value: 3200}
        },
        {
            component_name: {display_name: 'Zdroj', value: 'Be quiet! System Power 9 CM'},
            type: {display_name: 'Typ zdroje', value: 'ATX'},
            power: {display_name: 'Výkon zdroje [W]', value: 500},
            energy_effectivity: {display_name: 'Energetická efektivita', value: '80 PLUS BRONZE'},
            manufacturer: {display_name: 'Výrobce', value: 'Be quiet!'},
            web: {display_name: 'Webové stránky zdroje', value: 'https://www.bequiet.com/'}
        },
        {
            component_name: {display_name: 'Základní deska', value: 'ASUS TUF GAMING B650-PLUS'},
        }
    ]
}

populateHTML();

function populateHTML(){
    document.getElementById('product-name').innerText = file.product_name;
    document.querySelector('.rating-container').innerText = file.rating + '/5';
    document.getElementById('main-image').src = file.img_path;

    const tagContainer = document.querySelector('.tag-container');
    file.tags.forEach(tag =>{
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = formatInfoLink(tag);
        a.className = 'tag';
        a.target = '_blank';
        a.innerText = tag;
        
        li.appendChild(a);
        tagContainer.appendChild(li);
    });

    document.querySelector('.right .amount').innerText = 'Skladem ' + file.amount + ' Ks';

    if(file.sale == 0){
        document.querySelector('.price-container .price').innerText = formatPrice(file.price) + ' Kč';
        var span = document.createElement('span');
        span.className = 'original-price';
        span.innerText = '';
        document.querySelector('.price-container .price').appendChild(span);
        document.querySelector('.price-container .sale').innerText = '';
    }
    else{
        var newPrice = file.price - file.sale;
        document.querySelector('.price-container .price').innerText = formatPrice(newPrice) + ' Kč';
        var span = document.createElement('span');
        span.className = 'original-price';
        span.innerText = formatPrice(file.price) + ' Kč';
        document.querySelector('.price-container .price').appendChild(span);
        document.querySelector('.price-container .sale').innerText = 'Ušetříte ' + formatPrice(file.sale) + ' Kč';
    }

    document.querySelector('.simple-description-text').innerText = file.short_description;

    var simple_description_a = document.createElement('a');
    simple_description_a.className = 'more-information';
    simple_description_a.innerText = ' Zobrazit detail produktu';

    var simple_description_span = document.createElement('span');
    simple_description_span.appendChild(simple_description_a);
    document.querySelector('.simple-description-text').appendChild(document.createElement('br'));
    document.querySelector('.simple-description-text').appendChild(simple_description_span);

    const component_list = document.querySelector('#description .component-list');

    file.components.forEach(component =>{
        var li = document.createElement('li');
        li.className = 'component';

        var div = document.createElement('div');
        div.className = 'component-heading';

        var h3 = document.createElement('h3');
        var span = document.createElement('span');

        var button = document.createElement('button');
        button.className = 'btn-display-more';

        var img = document.createElement('img');
        img.src = '/front-end/resources/produkt/arrow-black.png';

        button.appendChild(img);

        h3.innerText = component.component_name.display_name + ': ';
        span.innerText = component.component_name.value;

        h3.appendChild(span);
        div.appendChild(h3);
        div.appendChild(button);

        li.appendChild(div);

        var ul = document.createElement('ul');
        ul.className = 'component-details';

        // Loop trough all the component details and generate HTML acccordingly
        Object.keys(component).forEach(key =>{
            var item = component[key];

            if(item != null && item != undefined && key != 'component_name'){
                var component_detail_item = document.createElement('li');
                component_detail_item.innerText = item.display_name + ': ';
    
                var component_detail_value = document.createElement('span');
                component_detail_value.innerText = item.value;
    
                // Make an <a> element if the current item is a link
                if(key == 'web'){
                    var link_element = document.createElement('a');
                    link_element.href = item.value;
                    link_element.target = '_blank';
                    link_element.innerText = item.value;
                    component_detail_value.innerText = '';
                    component_detail_value.appendChild(link_element);
                }

                component_detail_item.appendChild(component_detail_value);

                ul.appendChild(component_detail_item);
            }
        });

        li.appendChild(ul);
        component_list.appendChild(li);
    })
}

function formatPrice(price){
    // This magic code creates spaces between thousands ¯\_(ツ)_/¯
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatInfoLink(tag){
    tag = String(tag);

    // This magic removes emojis from text
    tag = tag.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    tag = tag.trim();
    tag = tag.replace(/ /g, '-');
    tag = tag.toLowerCase();

    return '/front-end/info-pages/' + tag + '.html';
}