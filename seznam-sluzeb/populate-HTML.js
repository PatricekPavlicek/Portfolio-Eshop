const root = document.getElementById('services-container')
const JSONFilePath = '/front-end/seznam-sluzeb/sluzby.json';
const buttonText = 'Pokračovat';
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
            
            var service_item = document.createElement('div');
            service_item.className = 'service-item';

            var a = document.createElement('a');
            a.href = item.link;

            var icon_container = document.createElement('div');
            icon_container.className = 'icon-container';

            var img = document.createElement('img');
            img.alt = 'icon';
            img.src = item.icon_file_path;

            var h2 = document.createElement('h2');
            h2.innerText = item.name;
            
            var p = document.createElement('p');
            p.innerText = item.description;

            var button = document.createElement('button');
            button.innerText = buttonText;
            
            icon_container.appendChild(img);

            a.appendChild(icon_container);
            a.appendChild(h2);
            a.appendChild(p);
            a.appendChild(button);

            service_item.appendChild(a);

            root.appendChild(service_item);
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });    
}