const root = document.getElementById('content');
const JSONFilePath = '/front-end/obchod/loaded-items.json';
const productPageURL = '/front-end/obchod/produkt.html';

var productNameForProductPage;

populateHTML();

function populateHTML(){

    // Clear previous HTML
    root.innerHTML = '';

    // Get data from JSON file
    fetch(JSONFilePath)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            // Create HTML elements according to JSON file's retrieved data
            var product_container = document.createElement('div');
            product_container.className = 'product-container';

            // Top
            var top = document.createElement('div');
            top.className = 'top';
            top.style.backgroundImage = 'url(' + item.img + ')';
            top.addEventListener('click', function(){
                openProductPage(item.name);
            });

            var ul = document.createElement('ul');
            ul.className = 'tags';

            console.log(item.tags);

            item.tags.forEach(tag =>{
                var li = document.createElement('li');
                var p = document.createElement('p');
                p.className = 'tag';
                p.textContent = tag;
                li.appendChild(p);
                ul.appendChild(li);
            });

            var amount = document.createElement('p');
            amount.className = 'amount';
            amount.textContent = item.avaliable_amount + ' ks';

            var rating_container = document.createElement('div');
            rating_container.className = 'rating-container';

            if(item.rating > 0){
                var star = document.createElement('img');
                star.className = 'star';
                star.src = '/front-end/resources/obchod/star-yellow.png'
                star.alt = 'star';
    
                var rating = document.createElement('p');
                rating.innerText = item.rating + ' / 5';

                rating_container.appendChild(star);
                rating_container.appendChild(rating);
            }

            top.appendChild(ul);
            top.appendChild(amount);
            top.appendChild(rating_container);

            // Bottom
            var bottom = document.createElement('div');
            bottom.className = 'bottom';

            var product_name = document.createElement('h5');
            product_name.className = 'product-name';
            product_name.textContent = item.name;
            product_name.addEventListener('click', function(){
                openProductPage(item.name);
            });

            var product_description = document.createElement('p');
            product_description.className = 'product-description';
            product_description.textContent = item.simple_description;

            var product_price = document.createElement('p');
            product_price.className = 'product-price';
            product_price.textContent = formatPrice(item.price);

            var button = document.createElement('button');
            button.className = 'product-button';
            button.addEventListener('click', function(){
                addToCart(item.name);
            })

            var button_img = document.createElement('img');
            button_img.className = 'button-img';
            button_img.src = '/front-end/resources/obchod/cart-black.png';
            button_img.alt = 'cart';

            var button_text = document.createElement('p');
            button_text.className = 'button-text';
            button_text.textContent = 'Do košíku';

            button.appendChild(button_img);
            button.appendChild(button_text);

            bottom.appendChild(product_name);
            bottom.appendChild(product_description);
            bottom.appendChild(product_price);
            bottom.appendChild(button);

            product_container.appendChild(top);
            product_container.appendChild(bottom);

            root.appendChild(product_container);
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });    
}

function formatPrice(price){
    // This magic code creates spaces between thousands ¯\_(ツ)_/¯
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function openProductPage(productName){
    console.log('Open product page: ' + productName);
    productNameForProductPage = productName;

    window.location.href = productPageURL;
}

function addToCart(productName){
    console.log('Add product to cart: ' + productName);
}