var map;

function initMap() {
  let initPosition = {lat: -34.6613439, lng: -58.5868769};
  map = new google.maps.Map(document.getElementById('map'), {
    center: initPosition,
    zoom: 10
  });

  generarMarcador(-34.8256277, -59.6916194, "marcador uno", "descripcion del marcador uno");
  generarMarcador(-34.6051992, -58.504228, "marcador dos", "descripcion del marcador dos");
  generarMarcador(-34.571141, -58.6269227, "marcador tres", "descripcion del marcador tres");

}

function generarMarcador(lat, long, titulo, descripcion){
  let pos = {
    lat: lat,
    lng: long,
  }

  let contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h5 id="firstHeading" class="firstHeading">'+ titulo +'</h5>'+
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
    title: titulo
  })

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}
