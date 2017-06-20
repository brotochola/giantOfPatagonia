var tiempoSplash=1500;



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
    var aspectRatio=calcularAspectRatio();
    $(".contenidoCentrado").width(window.innerHeight/1.777);

    setTimeout(function(){
      $("#splash").hide();
      $("#mainMenu").show();
    }, tiempoSplash); //splash a la fuerza 1 seg
}


function calcularAspectRatio(){
  //1.33 ipad
  //1.775 iphone5
  return window.innerHeight/window.innerWidth;
}

////////

