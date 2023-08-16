$(document).ready(function(){
	var pswField = document.getElementById("psw");
	var usernameField = document.getElementById("uname");
	var container = document.getElementById("message");

	$("#login_btn").click(function(){
		container.innerHTML = "";
		var valid = true;
		if(usernameField.value == ""){
			var text = "Παρακαλώ συμπληρώστε ένα όνομα χρήστη";
			container.innerHTML += text+"<br>";
			container.style = "display: block; color: red";
			valid = false;
		}
		if(pswField.value == ""){
			var text = "Παρακαλώ συμπληρώστε έναν κωδικό πρόσβασης";
			container.innerHTML += text+"<br>";
			container.style = "display: block; color: red";
			valid = false;
		}
		if(valid){
			$.ajax({
				type: "POST",
				url: "login/login_server.php",
				data: {username: usernameField.value, password: pswField.value},
				success: function(response){
					if(response == 1){
						var text = "Λάθος όνομα χρήστη ή κωδικός πρόσβασης";
						container.innerHTML = text+"<br>";
						container.style = "display: block; color: red";
					}
					else{
						if(response == "admin"){
							window.location.href = "../web2022/admin/erwt1/admin_erwt1.php";
						}
						else{
							window.location.href = "../web2022/user/erwt234/user_erwt234.php";
						}
					}
				}
			});
		}
		
		
	});
});