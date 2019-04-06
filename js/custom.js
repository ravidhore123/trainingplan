if( localStorage.hits ) {
    localStorage.hits = Number(localStorage.hits) +1;
 } else {
    localStorage.hits = 1;
 }
 if(localStorage.hits == 1) {
    window.location = "welcome.html";
 }
 function navigatehome(){
    window.location = "index.html";
 }  
 


 
 var watchId = null;
 function geoloc() {
 if (navigator.geolocation) {
    var optn = {
          enableHighAccuracy : true,
          timeout : Infinity,
          maximumAge : 0
    };
 watchId = navigator.geolocation.watchPosition(showPosition, showError, optn);
 } else {
       alert('Geolocation is not supported in your browser');
 }
 }

function showPosition(position) {
    var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
       zoom : 12,
       center : googlePos,
       mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var mapObj = document.getElementById('mapdiv');
    var googleMap = new google.maps.Map(mapObj, mapOptions);
    var markerOpt = {
       map : googleMap,
       position : googlePos,
       title : 'Hi , I am here',
       animation : google.maps.Animation.DROP
    };
    var googleMarker = new google.maps.Marker(markerOpt);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
       'latLng' : googlePos
       }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
             var popOpts = {
                content : results[1].formatted_address,
                position : googlePos
             };
          var popup = new google.maps.InfoWindow(popOpts);
          google.maps.event.addListener(googleMarker, 'click', function() {
          popup.open(googleMap);
       });
          } else {
             alert('No results found');
          }
          } else {
             alert('Geocoder failed due to: ' + status);
          }
       });
       }

       function stopWatch() {
          if (watchId) {
             navigator.geolocation.clearWatch(watchId);
             watchId = null;

          }
       }

    function showError(error) {
    var err = document.getElementById('mapdiv');
    switch(error.code) {
    case error.PERMISSION_DENIED:
    err.innerHTML = "User denied the request for Geolocation."
    break;
    case error.POSITION_UNAVAILABLE:
    err.innerHTML = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    err.innerHTML = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    err.innerHTML = "An unknown error occurred."
    break;
    }
    }
    
    


    // canvas
    var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}