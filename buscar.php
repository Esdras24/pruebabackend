<?php
$cargar=$_POST['cargar'];
$tipo=$_POST['tipo'];
$ciudad=$_POST['ciudad'];
$precioMin=$_POST['precioMinimo'];
$precioMax=$_POST['precioMaximo'];

if ($cargar=="todo") {
  $data = json_decode(file_get_contents('./data-1.json'));
  echo json_encode($data);


}elseif ($cargar=="selectivo") {
  $data = json_decode(file_get_contents('./data-1.json'));
  $resultado = [];
  $comparadorCiudad="";
  $comparadorPrecio="";
  $comparadorTipo="";

  foreach ($data as $key => $json) {
    $comparadorCiudad = $json->Ciudad;
    $comparadorTipo = $json->Tipo;
    $comparadorPrecio = str_ireplace(["$",","], "", $json->Precio);//con esto quitamos el signo de dolar y la coma


    if (($comparadorCiudad==$ciudad || ""==$ciudad) && ($comparadorTipo==$tipo || ""==$tipo) && ($comparadorPrecio >= $precioMin) && ($comparadorPrecio <= $precioMax)) {
      array_push($resultado, $json);
    }
  }
  echo json_encode($resultado);
}

 ?>
