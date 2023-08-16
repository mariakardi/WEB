$(document).ready(function(){
    $( "#diagdate" ).datepicker({ dateFormat: 'yy-mm-dd' });




function setTableCase(case_table){
    var table = document.getElementById("case_table");
    if(table != null){
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
    }
    var tbody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cellElement = document.createElement("th");
    var cellContent = document.createTextNode("POI");
    cellElement.appendChild(cellContent);
    row.appendChild(cellElement);
    var cellElement = document.createElement("th");
    var cellContent = document.createTextNode("Διεύθυνση");
    cellElement.appendChild(cellContent);
    row.appendChild(cellElement);
    var cellElement = document.createElement("th");
    var cellContent = document.createTextNode("Ημερομηνία επίσκεψης");
    cellElement.appendChild(cellContent);
    row.appendChild(cellElement);
    tbody.appendChild(row);
    for(var i = 0; i < case_table.length; i++){
        var row = document.createElement("tr");
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(case_table[i].name);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(case_table[i].adress);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(case_table[i].date_visit);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    // $("#data_div2").css('height', '800px');
    // $("#data_div2").css('width', '800px');
    $("#case_table").css('display', 'block');
}

function submitCase(){
    var dateOfCase = $('#diagdate').val();

    if(dateOfCase == ''){
        alert("Παρακαλώ επιλέξτε την ημερομηνία που διαγνωστήκατε θετικός");
        return;
    }

    var conf = confirm("Είστε σίγουροι ότι θέλετε να καταχωρήσετε να καταχωρήσετε τον εαυτό σας σαν κρούσμα;");
    if(conf){
        $.ajax({
            type: "POST",
            data:{dateOfCase: dateOfCase},
            url: "insert_case.php",
            ===========================================================================

            success: function(response){
                console.log(response);
                if(response == "1"){
                    alert("Επιτυχής καταχώρηση του κρούσματος σας");
                    location.reload();
                }
                else if (response == "-1"){
                    alert("Έχετε ήδη καταγράψει ένα κρούσμα και με ημερομηνία που δεν έχει ξεπεράσει τις 14 ημέρες");
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
}