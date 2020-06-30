//funcion para inicializar los componentes de materialize
$(document).ready(function() {
    $('select').material_select();
});

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){

     } else {
        //this.rewind(1.0, video, intervalRewind);
    //    video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
  //    video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

//funcion para mostrar todos los bienes raices
var cargar = "";
var ciudad="";
var tipo="";
var precioMinimo=0;
var precioMaximo=0;

$('#mostrarTodos').click(function() {
  $(".contenedorResultados").empty();
  cargar = "todo";
  cargarDatos(cargar,ciudad,tipo,precioMinimo,precioMaximo);
});

//funcion para mostrar todos los bienes raices que cumplan la seleccion

$('#submitButton').click(function() {
 event.preventDefault();
 $(".contenedorResultados").empty();
 ciudad = $('#selectCiudad').val();
 tipo=$('#selectTipo').val();
 precioMinimo = $("#rangoPrecio").val().split(";")[0];
 precioMaximo = $("#rangoPrecio").val().split(";")[1];
 cargar="selectivo";
 cargarDatos(cargar,ciudad,tipo,precioMinimo,precioMaximo);
});

//funcion que carga el json completo
function cargarDatos(cargar,ciudad,tipo,precioMinimo,precioMaximo) {
  $.ajax(
    {
      url:'./buscar.php',
      type:'POST',
      data:{cargar,ciudad,tipo,precioMinimo,precioMaximo}
    }
  ).done(function (data) {
    var obj = JSON.parse(data);
    for (var i = 0; i < obj.length; i++) {
      $(".contenedorResultados").prepend("<div class='divider'></div>\
      <div class='row'>\n\
        <div class='col l1'>\n\
          <img src='img/home.jpg' class='responsive-img' alt=''>\n\
        </div>\n\
        <div class='col l11'>\n\
          <strong>Direccion: </strong>"+obj[i].Direccion+"<br>\n\
          <strong>Ciudad: </strong>"+obj[i].Ciudad+"<br>\n\
          <strong>Telefono: </strong>"+obj[i].Telefono+"<br>\n\
          <strong>Codigo Postal: </strong>"+obj[i].Codigo_Postal+"<br>\n\
          <strong>Precio: </strong>"+obj[i].Precio+"<br>\n\
          <strong>Tipo: </strong>"+obj[i].Tipo+"<br>\n\
        </div>\n\
      </div>")
    }
  })
}
