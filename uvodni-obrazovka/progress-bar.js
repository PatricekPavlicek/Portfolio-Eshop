var width = 0;
const progressBarSpeed = 0.5;

var fadeInOpacity = 0;
var fadeOutOpacity = 1;

const fadeInSpeed = 0.1;
const fadeOutSpeed = 0.1;

const M_PBarContainer = document.getElementById('progress-bar-container-merch');
const S_PBarContainer = document.getElementById('progress-bar-container-service');

let M_PBars = [];
let S_PBars = [];

var M_PBarIndex = 0;
var S_PBarIndex = 0;

var M_Index = 0;
var S_Index = 0;

const M_ImageContainer = document.getElementById('item-merch');
const S_ImageContainer = document.getElementById('item-services');

const M_Prefix = '/front-end/resources/index-merch/'
const S_Prefix = '/front-end/resources/index-services/'

const M_Images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
const S_Images = ['1.jpg', '2.jpg', '3.jpg'];

function loadBars(){
    // To save this from unnecesarry computation and conversion between px and %
    // I'm just gonna assume that there is one extra bar which will not be created
    // so that there is extra space for the added margin

    var M_BarWidth = 100 / M_Images.length + 1; // [%]
    var S_BarWidth = 100 / S_Images.length + 1; // [%]

    // Create Progress Bar(s) for Merch
    for(var i = 0; i < M_Images.length; i++){
        var newBar = document.createElement('div');
        newBar.className = 'progress-bar-outside';
        newBar.style.width = M_BarWidth + '%';

        var newBarInside = document.createElement('div');
        newBarInside.className = 'progress-bar-inside';
        newBarInside.style.width = 0;

        newBar.appendChild(newBarInside);
        M_PBarContainer.appendChild(newBar);

        M_PBars.push(newBarInside);
    }

    // Create Progress Bar(s) for Services
    for(var i = 0; i < S_Images.length; i++){
        var newBar = document.createElement('div');
        newBar.className = 'progress-bar-outside';
        newBar.style.width = S_BarWidth + '%';

        var newBarInside = document.createElement('div');
        newBarInside.className = 'progress-bar-inside';
        newBarInside.style.width = 0;

        newBar.appendChild(newBarInside);
        S_PBarContainer.appendChild(newBar);

        S_PBars.push(newBarInside);
    }
}

function movePBars() {
    width += progressBarSpeed;

    if(width >= 100){
        changeImage();
        M_PBars[M_PBarIndex].style.width = '100%';
        S_PBars[S_PBarIndex].style.width = '100%';

        width = 0;

        M_PBarIndex++;
        S_PBarIndex++;

        if(M_PBarIndex >= M_PBars.length){
            clearPBars(M_PBars);
            M_PBarIndex = 0;
        }
        if(S_PBarIndex >= S_PBars.length){
            clearPBars(S_PBars);
            S_PBarIndex = 0;
        }
    }

    M_PBars[M_PBarIndex].style.width = width + '%';
    S_PBars[S_PBarIndex].style.width = width + '%';

    requestAnimationFrame(movePBars);
}

function clearPBars(Pbars){
    Pbars.forEach(element => {
        element.style.width = '0%';
    });
}

function changeImage(){
    M_Index = M_Index >= M_Images.length - 1 ? 0 : M_Index + 1;
    S_Index = S_Index >= S_Images.length - 1 ? 0 : S_Index + 1;

    const M_Image = "url('" + M_Prefix + M_Images[M_Index] + "')";
    const S_Image = "url('" + S_Prefix + S_Images[S_Index] + "')";

    M_ImageContainer.style.backgroundImage = M_Image;
    S_ImageContainer.style.backgroundImage = S_Image;
}

loadBars();
movePBars();
changeImage();