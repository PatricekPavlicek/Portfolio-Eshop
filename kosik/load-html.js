const products = [
    {
        product_name: 'Nevim',
        img_path: '/front-end/resources/obchod/product-pc.webp',
        price: 25000,
        sale: 2000,
        amount: 20,
        selected_amount: 5,
        tags: ['Child labor 🤫', 'White nibba 🗿', 'Amogus 💫']
    },
    {
        product_name: 'Komp 2',
        img_path: '/front-end/resources/obchod/product-pc.webp',
        price: 5000,
        sale: 0,
        amount: 4,
        selected_amount: 1,
        tags: []
    },
    {
        product_name: 'Hall 3000',
        img_path: '/front-end/resources/obchod/product-pc.webp',
        price: 15000,
        sale: 500,
        amount: 10,
        selected_amount: 10,
        tags: ['Cigan 🤫', 'White nibba 🗿', 'Amogus 💫']
    }
]

const cart_items_container = document.querySelector('.cart-items-container');

fillCart();

function fillCart(){
    cart_items_container.innerHTML = '';

    products.forEach(product =>{
        var item_li = document.createElement('li');
        item_li.className = 'item-li';
        
    
        var item = document.createElement('div');
        item.className = 'item';
    
        item_li.appendChild(item);
    
        var img = document.createElement('img');
        img.className = 'main-img';
        img.src = product.img_path;
    
        var h4 = document.createElement('h4');
        h4.innerText = product.product_name;
    
        if(product.tags.length > 0) var ul = document.createElement('ul');
        
        product.tags.forEach(tag =>{
            var tag_element = document.createElement('li');
            tag_element.className = 'tag';
            tag_element.innerText = tag
    
            ul.appendChild(tag_element);
        });

        var price_of_one = document.createElement('p');
        var price_of_one_value = formatPrice(product.price - product.sale);
        price_of_one.className = 'price-of-one';
        price_of_one.innerHTML = `<span class="blue">${price_of_one_value}</span> Kč / Ks`;
    
        var sale = document.createElement('p');
        sale.className = 'sale'

        if(product.sale > 0){
            sale.innerText = formatPrice(product.price) + ' Kč';
        }
    
        var price_of_all = document.createElement('p');
        var price_of_all_value = formatPrice((product.price - product.sale) * product.selected_amount);
        price_of_all.className = 'price-of-all';
        price_of_all.innerHTML = `<span class="blue">${price_of_all_value}</span> Kč`;
    
        var selected_amount_container = document.createElement('div');
        selected_amount_container.className = 'selected-amount-container';
    
        var selected_amount_input = document.createElement('input');
        selected_amount_input.min = '1';
        selected_amount_input.max = product.amount;
        selected_amount_input.className = 'selected-amount-number';
        selected_amount_input.innerText = product.selected_amount + ' Ks';
        selected_amount_input.type = 'number';
        selected_amount_input.value = product.selected_amount;

        selected_amount_input.addEventListener('change', function(){
            var newNumber = selected_amount_input.value;
            if(newNumber < 1){
                newNumber = 1;
            }
            if(newNumber > product.amount){
                newNumber = product.amount;
            }

            selected_amount_input.value = newNumber;
            product.selected_amount = newNumber;

            var final_price_value_new = 0;
            products.forEach(x => {
                final_price_value_new += (x.price - x.sale) * x.selected_amount;
            });
            final_price_value_new = formatPrice(final_price_value_new); 

            var price_of_all_value_new = formatPrice((product.price - product.sale) * product.selected_amount);
            price_of_all.innerHTML = `<span class="blue">${price_of_all_value_new}</span> Kč`;
            document.querySelector('.final-price').innerHTML = `Celkem <span>${formatPrice(final_price_value_new)}</span> Kč`
        });

        var btn_sub = document.createElement('button');
        btn_sub.className = 'substract';
        btn_sub.onclick = function(){
            product.selected_amount = product.selected_amount > 1 ? product.selected_amount - 1 : 1;
            
            var price_of_all_value_new = formatPrice((product.price - product.sale) * product.selected_amount);
            var final_price_value_new = 0;

            products.forEach(x => {
                final_price_value_new += (x.price - x.sale) * x.selected_amount;
            });

            selected_amount_input.value = product.selected_amount;
            price_of_all.innerHTML = `<span class="blue">${price_of_all_value_new}</span> Kč`;
            document.querySelector('.final-price').innerHTML = `Celkem <span>${formatPrice(final_price_value_new)}</span> Kč`
        }
    
        var img_sub = document.createElement('img');
        img_sub.src = '/front-end/resources/produkt/minus-white.png';
    
        btn_sub.appendChild(img_sub);
    
        var btn_add = document.createElement('button');
        btn_add.className = 'add';
        btn_add.onclick = function(){
            product.selected_amount = product.selected_amount < product.amount ? product.selected_amount + 1 : product.amount;
            
            var price_of_all_value_new = formatPrice((product.price - product.sale) * product.selected_amount);
            var final_price_value_new = 0;

            products.forEach(x => {
                final_price_value_new += (x.price - x.sale) * x.selected_amount;
            });

            selected_amount_input.value = product.selected_amount;
            price_of_all.innerHTML = `<span class="blue">${price_of_all_value_new}</span> Kč`;
            document.querySelector('.final-price').innerHTML = `Celkem <span>${formatPrice(final_price_value_new)}</span> Kč`
        }
    
        var img_sub = document.createElement('img');
        img_sub.src = '/front-end/resources/produkt/plus-white.png';
    
        btn_add.appendChild(img_sub);

        var ks = document.createElement('p');
        ks.innerText = 'ks';

        selected_amount_container.appendChild(btn_sub);
        selected_amount_container.appendChild(selected_amount_input);
        selected_amount_container.appendChild(ks);
        selected_amount_container.appendChild(btn_add);

        var btn_remove = document.createElement('button');
        btn_remove.className = 'remove';
        btn_remove.innerText = 'X';
        btn_remove.onclick = function(){
            var index = products.indexOf(product);
            if(index != 0){
                products.splice(index, index);
            }
            else{
                products.shift();
            }
            fillCart();
            resizeItems();
        }
    
        item.appendChild(img);
        item.appendChild(h4);
        if(product.tags.length > 0){
            item.appendChild(ul);
        }
        item.appendChild(selected_amount_container);
        item.appendChild(price_of_one);
        item.appendChild(sale);
        item.appendChild(price_of_all);
        item.appendChild(btn_remove);
    
        cart_items_container.appendChild(item_li);
    });

    var final_price_value = 0
    products.forEach(x => {
        final_price_value += (x.price - x.sale) * x.selected_amount;
    });
    final_price_value = formatPrice(final_price_value);

    document.querySelector('.final-price').innerHTML = `Celkem <span class="blue">${final_price_value}</span> Kč`;

    console.log('Products: ' + products);

    var btn_next = document.querySelector('.btn-next');
    if(products == null || products.length == 0){
        btn_next.classList.add('link-unclickable');
    }
    else{
        btn_next.classList.remove('link-unclickable'); 
    }
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

// Change the height of the items in the shopping cart based on whether the item has a tag-container or not
window.addEventListener('resize', resizeItems());

function resizeItems(){
    document.querySelectorAll('.item-li').forEach(item =>{
        // If the child element count of item is 8 that means it also contains a tag-container, if it has 7 child elements, there is no tag-container
        var hasTagContainer = item.firstElementChild.childElementCount == 8 ? true : false;

        if(window.innerWidth < 700){
            item.style.height = hasTagContainer ? '480px' : '380px';
        }
        else if(window.innerWidth < 1000 & window.innerWidth >= 700){
            item.style.height = '430px';
        }
        else{
            item.style.height = '300px';
        }
    });
}

