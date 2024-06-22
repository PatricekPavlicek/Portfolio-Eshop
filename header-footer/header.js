const widthBreakPoint = 680;
const headerNarrow = document.getElementById('header-narrow');
const headerWide = document.getElementById('header-wide');
const sideMenu = document.querySelector('.side-menu');
const sideMenuDisplayButton = document.querySelector('.right .narrow-menu-button');
const sideMenuHideButton = document.querySelector('.side-menu .narrow-menu-button');
const cartButton = document.querySelector('.right .cart-button');

displayHeader();
hideSideMenu();

window.addEventListener('resize', displayHeader);

sideMenuDisplayButton.onclick = displaySideMenu;
sideMenuHideButton.onclick = hideSideMenu;

function displayHeader(){
    const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    if(windowWidth <= widthBreakPoint){
        displayNarrowHeader();
        hideSideMenu();
    }
    else{
        displayWideHeader();
    }
}

function displayNarrowHeader(){
    headerNarrow.style.display = 'flex';
    headerWide.style.display = 'none';
}

function displayWideHeader(){
    headerWide.style.display = 'flex';
    headerNarrow.style.display = 'none';
}

function displaySideMenu(){
    sideMenu.style.display = 'flex';
    growMenu();
    moveCart();
    sideMenuHideButton.style.display = 'flex';
    sideMenuDisplayButton.style.display = 'none';
    cartButton.style.position = 'absolute';
    cartButton.style.right = '28vw';
}

function hideSideMenu(){
    shrinkMenu();
    sideMenuDisplayButton.style.display = 'flex';
    sideMenuHideButton.style.display = 'none';
    cartButton.style.position = 'relative';
    cartButton.style.right = '0';
}

function growMenu() {
    let width = 0;
    function increaseWidth() {
        width += 2;
        sideMenu.style.width = width + 'vw';
        if (width < 50) {
            requestAnimationFrame(increaseWidth);
        }
        else{
            width = 50;
        }
    }
    increaseWidth();
}

function shrinkMenu() {
    let width = 30;
    function decreaseWidth() {
        width -= 2;
        sideMenu.style.width = width + 'vw';
        if (width > 0) {
            requestAnimationFrame(decreaseWidth);
        }
        else{
            width = 0;
            sideMenu.style.display = 'none';
        }
    }
    decreaseWidth();
}

function moveCart(){
    let rightPosition = Math.round(((window.innerWidth - cartButton.getBoundingClientRect().right) / window.innerWidth) * 100);;
    function updatePosition(){
        rightPosition += 1; 
        cartButton.style.right = rightPosition + 'vw';
        if (rightPosition < 28) {
            requestAnimationFrame(updatePosition);
        }
        else{
            rightPosition = 28;
            cartButton.style.right = rightPosition + 'vw';
        }
    }
    updatePosition();
}