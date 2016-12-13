$(document).ready(function(){
  $('.modal').modal();
  let boton = document.getElementById("btn_agregar");
  boton.addEventListener("click", function(){
    sendForm();
  })
});

setTimeout(() => {
  $(".remove").on("click", function(){
    let id = $(this).attr("data-id");
    confirmRemove(id);
    console.log(id);
  })
}, 3000);

function confirmRemove(id){
  console.log(id);
  let confirmation = confirm("Estas seguro que deseas eliminar el refugio?");
  if(confirmation){
    remove(id);
  }else{
    console.log("NO");
  }
}

function remove(id){
  $.ajax({
    url: "https://hackaton-backend.herokuapp.com/places?id="+id,
    type: "DELETE"
  })
  .then((res) => {
    location.reload();
  })
  .catch((err) => {
    console.log(err);
  })
}

function sendForm(){
  let latitud = $("#latitud").val();
  let longitud = $("#longitud").val();
  let nombre = $("#nombre").val();
  let desc = $("#descripcion").val();

  $.ajax({
    url: `https://hackaton-backend.herokuapp.com/places?name=${nombre}&description=${desc}&latitude=${latitud}&longitude=${longitud}`,
    type: "POST"
  })
  .then((res) => {
    location.reload();
  })
  .catch((err) => {
    console.log(err);
  })
}
