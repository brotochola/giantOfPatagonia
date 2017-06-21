var tiempoSplash=1500;
var dataDinos={};
var servidor="http://www.pixeloide.com/giantsOfPatagonia/"
var dataUsuario={};
dataUsuario.paginasVisitadas=[];
dataUsuario.dinosEscaneados=[];
var dinoActivo=-1;


$(document).ready(function() {
  

    console.log("doc ready");
    

    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("pause", onPauseFired, false);
        document.addEventListener("backbutton", onBackKeyDown, false);
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

function onBackKeyDown(){
    console.log("####  back button");

}




function guardarData(data){
  //recibe un objeto y lo manda al server
   $.ajax({
          url: servidor+"saveData.php?",
        crossDomain: true,
         type: "POST",
          dataType: 'json',
          success: function(json) {
           console.log(json);
           console.log("la data se guardo ok")
          }});

}

function onPauseFired(){
  console.log("#### la app se minimizo");

  guardarData(dataUsuario);


}

function onDeviceReady() {
    console.log("device ready");
  //  if( window.isphone )  navigator.splashscreen.hide();
  
    //responsive
    responsive();
  
    setTimeout(function(){
      $("#splash").hide();
      $("#mainMenu").show();
      agregarPaginaVisitada("mainMenu");
    }, tiempoSplash); //splash a la fuerza 1 seg


   //click en el boton scanner
  $("#scanner").click(function(){
    agregarPaginaVisitada("scanner");
     cordova.plugins.barcodeScanner.scan(function(data) {
        QRok(data);
      }, function(error) {
        QRmal(error);
      });
  });


   $("#lista").click(function(){
      agregarPaginaVisitada("lista");
      console.log("lista");
   });

   $("#minijuegos").click(function(){
      agregarPaginaVisitada("minijuegos");
    console.log("minijuegos");
   });

   $("#info").click(function(){
      agregarPaginaVisitada("info");
    console.log("info");
   });

//carga data dinos
    $.ajax({
          url: "dataDinos.json",
          dataType: 'json',
          type: "POST",
          success: function(json) {
             dataDinos=json;
          }});


    //guardo data localmente para despues mandarla a la DB
  dataUsuario.plataforma=platform.os.family; //android o ios
  dataUsuario.idioma=navigator.language; //"es-US" : español de eeuu
  dataUsuario.versionSO=platform.os.version;
  dataUsuario.fecha=new Date();
  dataUsuario.marca=navigator.appVersion;
  
  //guardo la latitud y longitud usando un plugin de CORDOVA
  //si esta todo bien, lo meto en el objeto de la data
    navigator.geolocation.getCurrentPosition(function(position){
      dataUsuario.latitud=position.coords.latitude ;
      dataUsuario.longitud=position.coords.longitude ;
    }, function(error){
        console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    });


}


function playVideoDino(id){
    dinoActivo=id;
    $("video#videoDinos").attr("src", dataDinos[id].video);
    $("#videos").show();
}


function encontrarDinoPorNombre(nombre){
  for(var i=0; i<dataDinos.length;i++){
    if(nombre.toLowerCase()==dataDinos[i].nombre.toLowerCase()){
      return dataDinos[i];
    }
  }
  return -1;
}

function QRok(data){
  alert(data.text);
}
function QRmal(error){
  console.log(error);
}


function responsive(){
  console.log("responsive");
   var aspectRatio=calcularAspectRatio();
    $(".contenidoCentrado").width(window.innerHeight/aspectRatio/1.2);
}
function calcularAspectRatio(){
  //1.33 ipad
  //1.775 iphone5
  return window.innerHeight/window.innerWidth;
}

////////

function agregarPaginaVisitada(cual){
  dataUsuario.paginasVisitadas.push(cual);
}