let menuStatus = false;
if (localStorage.getItem("theme")) {
    var theme = localStorage.getItem("theme");
} else {
    var theme = "light"
    localStorage.setItem("theme", theme)
}

document.getElementById('background').classList.add(theme);
document.getElementById('inf').classList.add(theme);
document.getElementById('text').classList.add("popup-"+theme);
document.getElementById('cabecario').classList.add("cabecario-"+theme);
document.getElementById('menu-button').innerHTML = `<img class="menu-button-open" src="public/Recursos/Imagens/Menu-`+theme+`.png">`;

function changeTheme() {
    if (theme == "light") {
      theme = "dark"
    } else {
      theme = "light"
    }
    localStorage.setItem("theme", theme);
    window.location.reload(true);
}

function changeMenu() {
    if (menuStatus) {
        menuStatus = false;
        document.getElementById('menu-button').innerHTML = `<img class="menu-button-open" src="public/Recursos/Imagens/Menu-`+theme+`.png">`;
        menuClose();
    } else {
        menuStatus = true;
        document.getElementById('menu-button').innerHTML = `<div class="menu-button-close popup-`+theme+`" style="border-width: 0px;"> x </div>`;
        //document.getElementById('menu-button').innerHTML = `<img class="menu-button-close" src="public/Recursos/Imagens/Menu-close-`+theme+`.png">`;
        menuOpen();
    }
}

function menuOpen() {
    let checkedSwitch;

    if (theme == "dark") {
        checkedSwitch = "checked";
    } else {
        checkedSwitch = "";
    }

    document.getElementById('menu').classList.add("popup-"+theme);
    document.getElementById('menu').classList.add("menu");
    document.getElementById('menu').innerHTML += `
    
    <form method="post">
        <br><br><br><br><br><br><br><br>
        <button id="map" class="changePage popup-`+theme+`" type="input" name="change" class="butt-history" value="/map" > Página Inicial </button><br>
        <button id="sobre" class="changePage popup-`+theme+`" type="input" name="change" class="butt-history" value="/sobre" > Sobre </button><br>
        <button id="contatos" class="changePage popup-`+theme+`" type="input" name="change" class="butt-history" value="/contatos" > Contatos </button>
        <br><br><br>
        <label style="font-size: 50px" class="switch">
            <div style="transform: translateX(-70px);">Tema</div>
            <input id="switch" onchange="changeTheme(value)" type="checkbox" `+checkedSwitch+`>
            <span style="transform: translateX(100px);" class="slider round"></span>
        </label>
    </form>`;
    let parentDiv = document.getElementById('menu');
    let menu_form = parentDiv.querySelector('form');

    menu_form[pag].classList.add("selecionadoButton-"+theme);
}

function menuClose() {
    let e = document.getElementById("menu");
    for (child of e.children){
        child.remove();
    }
    e.classList.remove("popup-"+theme);
    e.classList.remove("menu");
}