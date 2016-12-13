var map;

function initMap() {
  let initPosition = {lat: -34.6613439, lng: -58.5868769};
  map = new google.maps.Map(document.getElementById('map'), {
    center: initPosition,
    zoom: 10
  });
}

function generarMarcador(lat, long, nombre, descripcion){
  let pos = {
    lat: lat,
    lng: long,
  }

  let contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h5 id="firstHeading" class="firstHeading">'+ nombre +'</h5>'+
      '<div id="bodyContent">'+
      '<p>'+ descripcion +'</p>'+
      '</div>'+
      '</div>';

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
.done((res) => {
  var refugios = JSON.parse(res);
  for (i in refugios){
    let lat = parseFloat(refugios[i]["latitude"]);
    let long = parseFloat(refugios[i]["longitude"]);
    let nombre = refugios[i]["name"];
    let descripcion = refugios[i]["description"];
    generarMarcador(lat, long, nombre, descripcion);
  }
});
