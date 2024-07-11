let menuStatus = false;
let pag = "map";
if (localStorage.getItem("theme")) {
    var theme = localStorage.getItem("theme");
} else {
    var theme = "light"
    localStorage.setItem("theme", theme)
}

document.getElementById('add-marker').innerHTML += `<img class="addMarker" src="public/Recursos/Imagens/addMarker-`+theme+`.png">`
document.getElementById('text').classList.add("popup-"+theme);
document.getElementById('area-foco').innerHTML += `
<div class="center-align popup-text popup-color `+"popup-"+theme+`" style="width:180px; height:40px; transform: translate(0px, 620px);">
<label style="font-size: 20px" class="switch">
    <div style="transform: translate(-40px, 0px);" >Áreas</div>
    <input id="switch" onchange="areasFoco()" type="checkbox" style="border-width: 2px">
    <span class="`+"slider-"+theme+`" style="transform: translate(40px, 0px); border-width: 2px"></span>
</label>
</div>`;
document.getElementById('cabecario').classList.add("cabecario-"+theme);
document.getElementById('menu-button').innerHTML = `<img class="menu-button-open" style="z-index:503;" src="public/Recursos/Imagens/Menu-`+theme+`.png">`;

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
        document.getElementById('menu-button').innerHTML = `<img class="menu-button-open" style="z-index:503;" src="public/Recursos/Imagens/Menu-`+theme+`.png">`;
        menuClose();
    } else {
        menuStatus = true;
        document.getElementById('menu-button').innerHTML = `<div class="menu-button-close popup-`+theme+`" style="z-index:503; border-width: 0px;"> x </div>`;
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
        <button id="map" class="changePage selecionadoButton-`+theme+`" style="transform: translate(-15px, 60px);" type="input" name="change" value="/map" > Página Inicial </button>
        <button id="sobre" class="changePage popup-`+theme+`" style="transform: translate(-15px, -50px);" type="input" name="change" value="/sobre" > Sobre </button><br>
        <button id="contatos" class="changePage popup-`+theme+`" style="transform: translate(-15px, -50px);" type="input" name="change" value="/contatos" > Contatos </button>
        <br><br><br>
        <label style="font-size: 20px" class="switch">
            <div style="transform: translate(-20px, -70px);"">Tema</div>
            <input id="switch" onchange="changeTheme(value)" type="checkbox" `+checkedSwitch+`>
            <span style="transform: translate(40px, -70px);" class="slider round"></span>
        </label>
    </form>`;
    let parentDiv = document.getElementById('menu');
    let menu_form = parentDiv.querySelector('form');
    //menu_form[pag].classList.add("selecionadoButton-"+theme);
}

function menuClose() {
    let e = document.getElementById("menu");
    for (child of e.children){
        child.remove();
    }
    e.classList.remove("popup-"+theme);
    e.classList.remove("menu");
}