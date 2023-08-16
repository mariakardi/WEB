$(document).ready(function(){
    
    $.ajax({
        type: "POST",
        //data:{id: id, ektimisi: ektimisi},
        url: "get_data_user.php",
        success: function(response){
            console.log(response);
            var visits = response.visits;
            var cases = response.cases;

            setTabTable1(visits);
            setTabTable2(cases);
        //     if(response == "1"){
        //         alert("Επιτυχής καταχώρηση επίσκεψης");
        //     }
        //     else{
        //         alert("Υπήρξε ένα μη αναμενόμενο σφάλμα");
        //     }
        },
        error: function(response){
            console.log(response);
        }
    });
    $('#erwt7_tab').on("click", "li", function (event) {
		var activeTab = $(this).find('a').attr('href');
       
        var activeTab = $(this).find('a').attr('href');
		if(activeTab == "#menu1"){
           // setTabBasic();
		}	
		else if(activeTab == "#menu2"){
            var container = document.getElementById("message");
            var pswField = document.getElementById("pwd");
            var regular_expression = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var pswValid = false;
            $.ajax({
                type: "GET",
                url: "get_user_server.php",
                success: function(response){
                    $('#username').val(response.username);
                    $('#pwd').val(response.password);
                }
            });

            pswField.onkeyup = function(){
                if(!regular_expression.test(pswField.value)){
                    $('#change_btn').prop('disabled', true);
                    var text = "Το password πρέπει να είναι τουλάχιστον 8 χαρακτήρες και να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα, ένα αριθμό και κάποιο σύμβολο (π.χ. #$*&@)";
                    container.innerHTML = text;
                    container.style = "display: block; color: red";

                }
                else{
                    $('#change_btn').prop('disabled', false);
                    pswValid = true;
                    container.style = "display: none";
                }
            }
            
        
            pswField.onblur = function(){
                container.innerHTML = "";
                container.style = "display: none";
            }
		}
	});
});

function setTabTable1(visits){
    var table = document.getElementById("visits_table");
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
    var cellContent = document.createTextNode("Ημερομηνία");
    cellElement.appendChild(cellContent);
    row.appendChild(cellElement);
    tbody.appendChild(row);
    for(var i = 0; i < visits.length; i++){
        var row = document.createElement("tr");
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(visits[i].name);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(visits[i].address);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(visits[i].date);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    // $("#data_div2").css('height', '800px');
    // $("#data_div2").css('width', '800px');
    $("#visits_table").css('display', 'block');
}

function setTabTable2(cases){
    var table = document.getElementById("cases_table");
    if(table != null){
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
    }
    var tbody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cellElement = document.createElement("th");
    var cellContent = document.createTextNode("AA");
    cellElement.appendChild(cellContent);
    row.appendChild(cellElement);
    var cellElement = document.createElement("th");
    var cellContent = document.createTextNode("Ημερομηνία κρούσματος");
    cellElement.appendChild(cellContent);
    row.appendChild(cellElement);
    tbody.appendChild(row);
    for(var i = 0; i < cases.length; i++){
        var row = document.createElement("tr");
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(cases[i].aa);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        var cellElement = document.createElement("td");
        var cellContent = document.createTextNode(cases[i].date);
        cellElement.appendChild(cellContent);
        row.appendChild(cellElement);
        
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    // $("#data_div2").css('height', '800px');
    // $("#data_div2").css('width', '800px');
    $("#cases_table").css('display', 'block');
}

function changeButtonClick(){
    var pswField = document.getElementById("pwd").value;
    $.ajax({
        type: "POST",
        url: "user_update_server.php",
        data: {password: pswField},
        success: function(response){
            alert("Επιτυχής αλλαγή του κωδικού πρόσβασης");
            $('#change_btn').attr('disbaled', true);
        }
    });
}
