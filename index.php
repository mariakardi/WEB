<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<script src="login/login.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="login/login.css">
		<?php
		session_start();
		if (isset( $_SESSION['user_id'] ) && isset($_SESSION['type']) ) {
			if($_SESSION['type'] == "user"){
				//header("Location:forms/user/user_index.php");
			}
			else{
				//header("Location:forms/admin/admin_index.php");
			}
		}
		?>
	</head>
	<body>
		<h2>Είσοδος Χρήστη</h2>
		
		<form method="post">
			<div class="imgcontainer" style="width: 78%;">
				<img src="files/img_avatar2.png" alt="Avatar" class="avatar">
			</div>
			<div class="container" style="width: 78%;">
				<label for="uname"><b>Όνομα Χρήστη</b></label>
				<input type="text" placeholder="Εισάγετε Όνομα Χρήστη" id="uname" required>
				<label for="psw"><b>Κωδικός Πρόσβασης</b></label>
				<input type="password" placeholder="Εισάγετε Κωδικό Πρόσβαση" id="psw" required>	
				<button type="button" id = "login_btn">Είσοδος</button>
			</div>

			<div class="container" style="background-color:#f1f1f1; width: 75%;" style="width: 75%;">
				<span class="psw">Δεν είστε χρήστης; Πατήστε <a href="register/register.php">εδώ</a> για εγγραφή</span>
				<div class="container" id = "message" style="background-color:#f1f1f1; display:none; width: 75%;"></div>
			
			</div>
				<br>
	
		</form>
	</body>
</html>