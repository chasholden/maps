var maplat = 47.6553;
var maplong = -122.3035;
var mapzoom = 15;

//initMap code originally from Google maps API documentation, then modified by me

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: maplat, lng: maplong},
    scrollwheel: false,
    zoom: mapzoom
  });
  var marker = new google.maps.Marker({
    position: {lat: maplat, lng: maplong},
    map: map,
    title: 'Check this place out!'
  });
}

$("#geolocate").on("click", findMe);
$("#submit").on("click", updateMap);

// geolocation code originally from Google maps API documentation, then modified by me

function findMe (evt){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        maplat = position.coords.latitude;
        maplong = position.coords.longitude;
      initMap();
    }, function errorCallback( error )
        {
            var message;
            switch ( error.code )
            {
            case error.PERMISSION_DENIED:
                message = "Geolocation permission denied.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "Geolocation position unavailable.";
                break;
            case error.TIMEOUT:
                message = "Geolocation timed out.";
                break;
            }
            message += '\n' + error.message;
            alert( message );
        });
  } else {
    alert( 'No geolocation support' );
}
  evt.preventDefault( );
}


function updateMap (evt){
  var inputLat = parseFloat($("#userLat").val());
  var inputLong = parseFloat($("#userLong").val());
  var inputZoom = parseFloat($("#userZoom").val());
   if (isNaN( inputLat ) || inputLat > 90 || inputLat < -90 ){
     alert( 'Please input a numeric latitude within the correct range.' );
     return false;
   } else {
     maplat = inputLat;
   }
  if (isNaN( inputLong ) || inputLong > 180 || inputLong < -180 ){
    alert( 'Please input a numeric longitude within the correct range.' );
     return false;
   } else {
     maplong = inputLong;
   }
  if (isNaN( inputZoom ) || inputZoom > 20 || inputZoom < 0 ){
    alert( 'Please input a numeric zoom within the correct range.' );
     return false;
   } else {
     mapzoom = inputZoom;
   }

initMap();  
evt.preventDefault( );
}
