var position = document.getElementById("current_position");
position.addEventListener("click", function(){
  findNearestPlace();
})

function findNearestPlace(){
  navigator.geolocation.getCurrentPosition(handleCoords);
}

function handleCoords(response){
  let lat = response.coords.latitude;
  let long = response.coords.longitude;

  $.ajax({
    url: "https://hackaton-backend.herokuapp.com/nearest_places",
    data:{
      latitude: lat,
      longitude: long
    }
  })
  .done( (res) => {
    var response = JSON.parse(res);
    var nearest_lat = parseFloat(response["latitude"]);
    var nearest_long = parseFloat(response["longitude"]);
    var nearest_place = {lat: nearest_lat, lng: nearest_long};
    map.setCenter(new google.maps.LatLng(nearest_lat, nearest_long));
    map.setZoom(14);
  })
  .catch( (err) => {
    console.log(err);
  })
}
