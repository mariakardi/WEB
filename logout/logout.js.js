function logoutUser(){
	var conf = confirm("Θέλετε να αποσυνδεθείτε;");
	if(conf){
		console.log("Logout");
		$.ajax({
			type: "POST",
			url: "../../logout/logout.php",
			success: function(response){
				
				window.location = "../../index.php";
			}
		});
	}
}