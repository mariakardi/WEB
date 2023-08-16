var userLoc =null;
var currentLayer = null;
$(document).ready(function(){

    getAllTypes(); //καλει την συναρτηση που εχουμε ορισει

    var map = L.map('map'); //L=leaflet , 'map'=map της php
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.setView([38.2462420, 21.7350847], 14);       // [patra] , zoom=14
    var drawnItems = new L.FeatureGroup();      //διαχειριση των πινς
    map.addLayer(drawnItems)              // ενημερωση χαρτη με την κλαση 
    
    map.on('click',onMapClick );                //
    

    function onMapClick(e) {                                
       
    
            marker = L.marker(e.latlng).addTo(map);             //marker = pin

            var latLngs = [ marker.getLatLng() ];
            userLoc = marker;
            map.setZoom(14);
            map.panTo(e.latlng, 14);
            
            $('#search').prop('disabled', false); //ενεργοποιει ωσρε να μπορω να κανω αναζητηση
            $('#types').prop('disabled', false);
        }

        //marker
    }

    $('#search').on('click', function(){                //αν κανω κλικ το σερτς
        var selOption = text = $('#types option:selected'). text();             //γινεται χρηση query
        $.ajax({
            type: "POST",
            data:{type: selOption},
            url: "search_points_server.php",


            success: function(response){
                if(currentLayer != null){
                    map.removeLayer(currentLayer);
                }
                console.log(response);
                var hour = (new Date()).getHours();
                var day = (new Date()).getDay();
                let markersLayer = new L.LayerGroup();
                currentLayer = markersLayer;
                map.addLayer(markersLayer);
                for(id in response){
                    var loc = {lat: parseFloat(response[id].location.lat),lng: parseFloat(response[id].location.lng)};
                    var user = userLoc.getLatLng();
                    if(haversine_distance(loc, user) <= 5){
                        var popularity = response[id].popularity[day][hour];
                        var newMarker = null;
                        if(popularity >= 0 && popularity<= 32){
                            var greenIcon = new L.Icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                              });
                              newMarker = L.marker(loc, {icon: greenIcon, name:response[id].name}).addTo(map);
                        }
                        else if(popularity >= 33 && popularity<= 65){
                            var yellowIcon = new L.Icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                              });
                              newMarker = L.marker(loc, {icon: yellowIcon, name:response[id].name}).addTo(map);
                        }
                        else{
                            var redIcon = new L.Icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                              });
                              newMarker = L.marker(loc, {icon: redIcon, name:response[id].name});
                              //.addTo(map);
                        }
                        var popupString = "<b>Όνομα:</b>" + response[id].name+"<br><b>Διεύθυνση: </b> "+response[id].adress+"<br><b>Βαθμολογία: </b>"+response[id].rating+"<br><b>Τύπος: </b><ul>";
                        for(i = 0 ; i < response[id].types.length; i++){
                            popupString += "<li>"+response[id].types[i]+"</li>"
                        }
                        popupString += "</ul><br>"
                        popupString += "<b>Εκτίμηση επισκεψιμότητας: <b><br><ul><li>"+(hour+1)+":00 "+response[id].popularity[day][hour+1]+"%</li><li>"+(hour+2)+":00 "+response[id].popularity[day][hour+2]+"%</li></ul>";
                        popupString += "<br><b>Απόσταση από εσάς:<b> "+(haversine_distance(loc, user) * 1000).toFixed(2)+" μέτρα";
                        //if(haversine_distance(loc, user) <= 0.02){
                            popupString += "<p id ='poi_id' style ='display:none'>"+id+"</p>";
                            popupString += "<p id ='name' style ='display:none'>"+response[id].name+"</p>";
                            popupString += "<br><br><center><u>Δήλωση επίσκεψης</u>";
                            popupString += "<form>";
                            popupString += "<div class='form-group'>";
                            // popupString += "<label>Αριθμός επισκεπτών: </label>";
                            popupString += "<input type='number' id='ektimisi' placeholder='Αριθμός επισκεπτών' class='form-control' >";
                            popupString += "</div>";
                            popupString += "<button type='button' id = 'visitbtn' class='btn btn-primary'>Υποβολή</button>";
                            popupString += "</form>";
                        //}
                        newMarker.bindPopup(popupString);
                        newMarker.addTo(markersLayer);

                        //newMarker.r.bindPopup("<b>Πλατεία Γεωργίου</b>").openPopup();
                        
                    }
                }
            },
            error: function(response){

            }
        }); 

        $('#map').on('click', '#visitbtn', function(){
            var id = $('#poi_id').text();
            var name = $('#name').text();
            var ektimisi = $('#ektimisi').val();
            var conf = confirm("Είστε σίγουροι ότι θέλετε να καταχωρήσετε επίσκεψη στην τοποθεσία "+name+";");
            if(conf){
                $.ajax({
                    type: "POST",
                    data:{id: id, ektimisi: ektimisi},
                    url: "submit_visit.php",
                    success: function(response){
                        if(response == "1"){
                            alert("Επιτυχής καταχώρηση επίσκεψης");
                        }
                        else{
                            alert("Υπήρξε ένα μη αναμενόμενο σφάλμα");
                        }
                    },
                    error: function(response){
                        console.log(response);
                    }
                });
            }

        });
        // $('#visitbtn').on('click', function(e){
        //     e.preventDefault();
        //     var id = $('#id').val();
        //     console.log(id);
        // })

    });

===================================================================================================

    function haversine_distance(mk1, mk2) {
        R = 6371.0710; // Radius of the Earth in miles
        var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
      }
    ===========================================================
    function getAllTypes(){
        $.ajax({
            type: 'POST',
            url: 'get_types.php',
            success: function(response){
                console.log(response);
                var ispList = document.getElementById("types");
                for(i = 0; i < response.length; i++){
                    var option = document.createElement("option");
                    option.text = response[i];
                    ispList.appendChild(option);
                }
            }
        });
    }

});







