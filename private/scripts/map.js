var map;
var markers = [];

function initMap() {
  let initPosition = {lat: -34.6613439, lng: -58.5868769};
  map = new google.maps.Map(document.getElementById('map'), {
    center: initPosition,
    zoom: 10
  });

  google.maps.event.addListener(map, 'click', function(e) {
    /*placeMarker(e.latLng, map);
    setearCoordenadas(e.latLng);
    setearPais(e.latLng);*/
    //console.log(e.latLng.lat());
    $("#latitud").val(e.latLng.lat());
    $("#longitud").val(e.latLng.lng());
    console.log($("#latitud").val() + $("#longitud").val());
    $("#modalAgregar").modal('open');
  });
}

function generarMarcador(lat, long, nombre, descripcion, id){
  let pos = {
    lat: lat,
    lng: long,
  }

  let contentString = `<div id="content">
      <div id="siteNotice">
      </div>
      <h5 id="firstHeading" class="firstHeading"> ${nombre}</h5>
      <div id="bodyContent">
      <p> ${descripcion}</p>
      <a data-id="${id}" class="waves-effect waves-light btn remove">Quitar</a>
      </div>
      </div>`;

  let infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  let marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: nombre
  })

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

$.ajax({
  url: "https://hackaton-backend.herokuapp.com/places",
})
.then((res) => {
  var refugios = JSON.parse(res);

  for (i in refugios){
    let lat = parseFloat(refugios[i]["latitude"]);
    let long = parseFloat(refugios[i]["longitude"]);
    let nombre = refugios[i]["name"];
    let descripcion = refugios[i]["description"];
    let id = refugios[i]["id"];
    generarMarcador(lat, long, nombre, descripcion, id);
  }
})
