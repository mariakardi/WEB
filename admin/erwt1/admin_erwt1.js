function uploadToServer(){
	var fileInput = document.getElementById("file"); 
	if(fileInput.files.length == 0 ){
		alert("Παρακαλώ επιλέξτε ένα αρχείο");
	}
	var file = fileInput.files[0];
	var formData = new FormData();
	formData.append('file', file);
	const request = $.ajax({
		type: 'POST',
		url: "admin_erwt1_server.php",
		data: formData,
		cache: false,
		contentType: false,
		processData: false
	});
	
	request.done(onSuccess);
}

function deleteFromServer(){
	if(confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε τα δεδομένα. Αυτό θα επηρεάσει και τα δεδομένα που έχουν εισάγει οι χρήστες (επισκέψεις, δήλωση κρουσμάτων. η διαδικασία είναι ΜΗ ΑΝΑΣΤΡΕΨΙΜΗ)")){
		$.ajax({
			type: 'POST',
			url: "admin_delete.php",
			success: function(result){
					alert("Όλα τα δεδομένα διεγράφησαν με επιτυχία");
				
			}
		});
	}
}

function onSuccess(responseText){
	console.log(responseText);
	if(responseText == 111){
		alert("Επιτυχής εισαγωγή του αρχείου");
		location.reload();
	}
	else{
		alert("Υπήρξε ένα μη αναμενόμενο σφάλμα");
	}
}