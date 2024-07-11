var mark = [];
var icon = [];
var popup = L.popup({"maxWidth": "100%"});

//Marker
function marker(x, y, s, n, d) {
    //Vars
    this.id = mark.length;
    this.status = s;
    this.num = n;
    this.date = d;

    //Status and color
    if (this.status == 0) {
        this.status = "Sem foco de dengue"
        this.colorStatus = "green";
    }
    if (this.status == 1) {
        this.status = "Com foco de dengue"
        this.colorStatus = "red";
    } 
    if (this.status == 2) {
        this.status = "Vistoria pendente"
        this.colorStatus = "gray";
    }

    //Marker
    mark[this.id] = L.marker(
        [-24.560641, -54.05797],
        {}
    );
    mark[this.id]._latlng.lat = x;
    mark[this.id]._latlng.lng = y;
    let circle = L.circle(
        [mark[this.id]._latlng.lat, mark[this.id]._latlng.lng],
        {   
            radius: 200,
            color: "rgb(255, 0, 0)",
            stroke: 0
        }
    );
    
    mark[this.id].addTo(map_6bf0be160836eef4626325fcb6128fb7);
    //Popup
    mark[this.id].popup = L.popup({"maxWidth": "200%"});
    let popupContent;
    this.updatePopup = function() {

        popupContent = $(  `<div style=" width: 200px; height: 130px; font-size: 15px;" 
        class= "`+theme+`" </div> `)
        .html(
            "Status: "+this.status +"<br>"+
            "Número do Local: "+this.num+"<br>"+
            "Última vistoria: "+this.date+""+
            `<input type="hidden" name="id_edit" id="id-edit" value=`+this.id+`>`+
            `<form method="post">
                <button onclick="localStorage.setItem("id", `+this.id+`);" type="input" name="change" class="butt-history" value="/history" > Ver Histórico </button>
            </form>`+
            `<button style="transform: translate(0px, -30px);" type="button" onclick="editMarkerPopup()" class="butt-history"> Editar Marcador </button>`+
            `<div class="popup-01 `+theme+` " </div>` +
            `<div class="circle-status `+this.colorStatus+` " </div>`
        )[0];


        mark[this.id].popup.setContent(popupContent);
        mark[this.id].bindPopup(mark[this.id].popup);
    }
    this.update = function() {
        if (this.status == "Com foco de dengue" && showAreas) {
            circle.addTo(map_6bf0be160836eef4626325fcb6128fb7);
        } else {
            circle.remove();
        }

        if (map_6bf0be160836eef4626325fcb6128fb7._zoom >= 16) {
            mark[this.id].setIcon(icon[this.status]);
        } else {
            mark[this.id].setIcon(icon["null"]);
        }
        if (mark[this.id].popup._map) {
            localStorage.setItem("id", this.id);
        }
    }

    this.updatePopup();
}

localStorage.removeItem("id");
function getJson() {
    fetch('public/server/marker.json')
    .then(response => response.json())
    .then(json => {
        json.marcadores.map((obj) => {
            mark.push(new marker(obj.position.lat, obj.position.lng, obj.status, obj.num, obj.date));
        })
    })
}

function markZoomUpdate() {
    iconCostum();
    for (let i = 0; i < mark.length; i++) {
        mark[i].update();
    }
}

function iconCostum() {
    icon["Com foco de dengue"] = L.icon({
        "iconAnchor": [18, 49],
        "iconSize": [36, 49], 
        "iconUrl": "../Recursos/Imagens/1.png",
        "popupAnchor": [0, -55]
    });
                          
    icon["Sem foco de dengue"] = L.icon({
        "iconAnchor": [18, 49],
        "iconSize": [36, 49], 
        "iconUrl": "../Recursos/Imagens/2.png",
        "popupAnchor": [0, -55]
    });
    icon["Vistoria pendente"] = L.icon({
        "iconAnchor": [18, 49],
        "iconSize": [36, 49], 
        "iconUrl": "../Recursos/Imagens/3.png",
        "popupAnchor": [0, -55]
    });
    icon["null"] = L.icon({
        "iconAnchor": [18, 49],
        "iconSize": [36, 49], 
        "iconUrl": "../Recursos/Imagens/4.png",
        "popupAnchor": [0, -55]
    });
}

//Create new marker forms
function markerAddPopup() {
    let lat = sessionStorage.getItem("lat");
    let long = sessionStorage.getItem("long");
    let html = $(  `<div style=" width: 200px; height: 180px; font-size: 15px;" class= " `+theme+`" </div> `)
    .html(
        `<div style=" transform: translate(-22px, -15px); width: 250px; height: 210px; border-radius: 5%; font-size: 15px;" class=" `+theme+` " </div>`+
        `<div style="margin: 0px 15px; transform: translate(10px, 20px);" </div>`+
        `<form method="post">
            <label> Número da residência:</label>
            <input class="`+theme+`-input" type="number" name="number" id="numero-casa">
            <label> Status da residência:</label>
            <select id="status-marker" name="status" class="`+theme+`-input" > 
                <option value="0">Sem foco de dengue</option> 
                <option value="1">Com foco de dengue</option> 
            </select>
            <input type="hidden" name="lat" value=`+lat+`>
            <input type="hidden" name="lng" value=`+long+`>
            <input type="hidden" name="id" value=`+mark.length+`>
            <input type="hidden" name="date" value=`+today+`>
            <br><br>
            <label> Data: `+today+`</label>
            <button style="transform: translate(5px, 0px);" type="input" name="botao" class="butt-history" value="Submit" > Criar Marcador </button>
        </form>`
    )[0];
    popup.setContent(html);
    popup.setLatLng([lat, long]);
    popup.addTo(map_6bf0be160836eef4626325fcb6128fb7);
}

var popupEdit = L.popup({"maxWidth": "200%"});
function editMarkerPopup() {
    let id = document.getElementById("id-edit").value;
    let html = $(  `<div style=" width: 200px; height: 110px; font-size: 15px;" class= " `+theme+`" </div> `)
    .html(
        `<div style="height: 140px;" class="popup-add-marker `+theme+` " </div>`+
        `<div style="margin: 0px 15px; transform: translate(10px, 20px);" </div>`+
        `<label> Data: `+today+`</label>`+
        `<form method="post">
            <label> Status da residência:</label>
            <select id="status-add" name="statusAdd" class="`+theme+`-input" > 
                <option value="0">Sem foco de dengue</option> 
                <option value="1">Com foco de dengue</option> 
            </select>
            <input type="hidden" name="idAdd" value=`+id+`>
            <input type="hidden" name="dateAdd" value=`+today+`>
            <button style="transform: translate(5px, 0px);" type="input" name="edit" value="Submit" class="butt-history" > Editar Marcador </button>
        </form>`
    )[0];

    popupEdit.setContent(html);
    popupEdit.setLatLng(mark[id]._latlng);
    popupEdit.addTo(map_6bf0be160836eef4626325fcb6128fb7);

    mark[id].popup.close();
}