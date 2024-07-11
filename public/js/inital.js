
//Get date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var mapLoad = false;

today = dd + '/' + mm + '/' + yyyy;

navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude
    const long = position.coords.longitude;
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("long", long);
    map_6bf0be160836eef4626325fcb6128fb7 = L.map(
        "map_6bf0be160836eef4626325fcb6128fb7",
        {
                center: [lat, long],
                crs: L.CRS.EPSG3857,
                minZoom: 14,
                maxBounds: [[-24.521691, -54.014526], [-24.58852, -54.099581]],
                zoom: 16,
                zoomControl: false,
                preferCanvas: false
        }
    );
    mapLoad = true;
    loadTiles();
    //Set the icon markers
    iconCostum();
    
    //Read the json file
    getJson();
});

var map_6bf0be160836eef4626325fcb6128fb7;