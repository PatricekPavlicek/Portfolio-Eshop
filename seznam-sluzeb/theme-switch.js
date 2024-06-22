const colorSwitchButton = document.getElementById('theme-toggle');
var theme = 'dark';

colorSwitchButton.addEventListener('click', function(){
    // Accesing :root in css
    const root = document.documentElement;

    if(theme === 'dark'){
        // Change colors to fit light theme
        root.style.setProperty('--darker-background-color', 'rgb(220, 220, 220)');
        root.style.setProperty('--lighter-background-color', 'white');

        root.style.setProperty('--theme-color', '#00BFFF');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--underline-color', 'white');

        root.style.setProperty('--button-background-color', 'white');
        root.style.setProperty('--button-text-color', 'rgb(15,15,15)');
        root.style.setProperty('--button-hover-background-color', 'rgb(15,15,15)');
        root.style.setProperty('--button-hover-text-color', 'white');

        root.style.setProperty('--item-gradient-color-a', '#8EDEF8');
        root.style.setProperty('--item-gradient-color-b', '#00BFFF');

        root.style.setProperty('--spark-effect-color', 'rgb(15,15,15)');

        // Change spark effect width (for light theme wide)  
        root.style.setProperty('--spark-width', '2px');

        // Change icons
        const images = document.querySelectorAll('.icon-container img');
        images.forEach(img => {
            var previousSrc = img.src;
            img.src = previousSrc.replace('white', 'black');
        });

        theme = 'light';
    }
    else{
        // Change colors to fit dark theme
        root.style.setProperty('--darker-background-color', 'rgb(15,15,15)');
        root.style.setProperty('--lighter-background-color', 'rgb(30, 30, 30)');
        
        root.style.setProperty('--theme-color', '#00A7E1');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--underline-color', '#00A7E1');

        root.style.setProperty('--button-background-color', 'white');
        root.style.setProperty('--button-text-color', 'rgb(15,15,15)');
        root.style.setProperty('--button-hover-background-color', '#00A7E1');
        root.style.setProperty('--button-hover-text-color', 'rgb(15,15,15)');
        
        root.style.setProperty('--item-gradient-color-a', 'rgb(25,25,25)');
        root.style.setProperty('--item-gradient-color-b', 'rgb(15,15,15)');

        root.style.setProperty('--spark-effect-color', '#00A7E1');

        // Change spark effect width (for dark theme narrow)  
        root.style.setProperty('--spark-width', '1px');
        
        // Change icons
        const images = document.querySelectorAll('.icon-container img');
        images.forEach(img => {
            var previousSrc = img.src;
            img.src = previousSrc.replace('black', 'white');
        });

        theme = 'dark';
    }
}
);