var tiempoSplash=1500;
var scannerQR;


$(document).ready(function() {
    // are we running in native app or in a browser?

    console.log("doc ready");


    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

function onDeviceReady() {
    console.log("device ready");
    
  
    //responsive
    responsive();
  
    setTimeout(function(){
      $("#splash").hide();
      $("#mainMenu").show();
    }, tiempoSplash); //splash a la fuerza 1 seg


  scannerQR=cordova.plugins.barcodeScanner;
  //click en el boton scanner
  $("#scanner").click(function(){
     cordova.plugins.barcodeScanner.scan(function(data) {
        QRok(data);
      }, function(error) {
        QRmal(error);
      });
  });


   $("#lista").click(function(){
      console.log("lista");
   });

   $("#minijuegos").click(function(){
    console.log("minijuegos");
   });

   $("#info").click(function(){
    console.log("info");
   });


  
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

