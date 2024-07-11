theme = localStorage.getItem("theme");
let showAreas = false;

function loadTiles() {
    tile_layer_cd0db330e1918da801d6292227407242 = L.tileLayer('https://{s}.basemaps.cartocdn.com/'+theme+'_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 14
    });
    tile_layer_cd0db330e1918da801d6292227407242.addTo(map_6bf0be160836eef4626325fcb6128fb7);
}

loop();

function loop() {
    //devTest();
    markZoomUpdate();
    //Loop
    window.requestAnimationFrame(loop);
}

function areasFoco() {
    if (showAreas) {
        showAreas = false;
    } else {
        showAreas = true;
    }
}