$(document).ready(function(){
	var pswField = document.getElementById("psw");
	var usernameField = document.getElementById("uname");
	var repPsw = document.getElementById("re_psw");
	var email = document.getElementById("email");
	var container = document.getElementById("message");
	var regular_expression = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	var email_regular = new RegExp(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i);
	var pswValid = false, emailValid = false, pwdSame = false;
	
	pswField.onkeyup = function(){
		if(!regular_expression.test(pswField.value)){
			var text = "Το password πρέπει να είναι τουλάχιστον 8 χαρακτήρες και να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα, ένα αριθμό και κάποιο σύμβολο (π.χ. #$*&@)";
			container.innerHTML = text;
			container.style = "display: block; color: red";
		}
		else{
			pswValid = true;
			container.style = "display: none";
		}
	}
	
	email.onkeyup = function(){
		if(!email_regular.test(email.value)){
			var text = "Μη έγκυρο email";
			container.innerHTML = text;
			container.style = "display: block; color: red";
		}
		else{
			emailValid = true;
			container.style = "display: none";
		}
	}
	
	repPsw.onkeyup = function(){
		if(pswField.value != repPsw.value){
			var text = "Τα password στα δύο πεδία πρέπει να είναι ίδια";
			container.innerHTML = text;
			container.style = "display: block; color: red";
		}
		else{
			pwdSame = true;
			container.style = "display: none";
		}
	}

	pswField.onblur = function(){
		container.innerHTML = "";
		container.style = "display: none";
	}  
	
	repPsw.onblur = function(){
		container.innerHTML = "";
		container.style = "display: none";
	}  
	
	email.onblur = function(){
		container.innerHTML = "";
		container.style = "display: none";
	}
	
	$('#register_btn').click(function(){
		container.innerHTML = "";
		var valid = checkValidity(pswValid, emailValid, pwdSame, usernameField, pswField, email, container);
		console.log(valid);
		if(valid){
			console.log("Hello");
			$.ajax({
				url: "register_server",
				type: "POST",
				data: {username: usernameField.value, password: pswField.value, email: email.value},
				success: function(response){
					if(response == 0){
						var text = "Το όνομα χρήστη ή το email που εισάγατε υπάρχουν ήδη";
						container.innerHTML = text;
						container.style = "display: block; color: red";
					}
					else{
						alert("Επιτυχής εγγραφή");
						window.location.href = "../index.php";
					}
				}
			});
		}
	});
});

function checkValidity(pswValid, emailValid, pwdSame, usernameField, pswField, email, container){
	var valid = true;
	if(!pswValid){
		var text = "Το password πρέπει να είναι τουλάχιστον 8 χαρακτήρες και να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα, ένα αριθμό και κάποιο σύμβολο (π.χ. #$*&@)\n";
		container.innerHTML += text+"<br>";
		container.style = "display: block; color: red";
		valid = false;
	}
	if(!emailValid){
		var text = "Μη έγκυρο email\n";
		container.innerHTML += text+"<br>";
		container.style = "display: block; color: red";
		valid = false;
	}
	if(!pwdSame){
		var text = "Τα password στα δύο πεδία πρέπει να είναι ίδια\n";
		container.innerHTML += text+"<br>";
		container.style = "display: block; color: red";
		valid = false;
	}
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
	if(email.value == ""){
		var text = "Παρακαλώ συμπληρώστε ένα email";
		container.innerHTML += text+"<br>";
		container.style = "display: block; color: red";
		valid = false;
	}
	return valid;
}