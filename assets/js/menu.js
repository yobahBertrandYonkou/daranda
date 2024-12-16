let menu = document.querySelector('.nav-links');
let bars = document.querySelector('.bars');

bars.onclick = () => {
    let menuDisplay = menu.style.display;

    if (menuDisplay == 'none') {
        menu.style.display = 'flex';
    }else {
        menu.style.display = 'none';
    }
}

menu.onclick = () => {
    menu.style.display = 'none';
}