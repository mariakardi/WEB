<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<script src="register.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="register.css">
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
		<h2>Εγγραφή Χρήστη</h2>
		<form>
			<div class="container" style="width: 78%;">
				<label><b>Όνομα Χρήστη</b></label>
				<input type="text" placeholder="Εισάγετε Όνομα Χρήστη" id="uname" />
				<label><b>Κωδικός Πρόσβασης</b></label>
				<input type="password" placeholder="Εισάγετε Κωδικό Πρόσβασης" id="psw" />	
				<label><b>Επανάληψη Κωδικού Πρόσβασης</b></label>
				<input type="password" placeholder="Εισάγετε Κωδικό Πρόσβασης" id="re_psw" />	
				<label><b>email</b></label>
				<input type="email" placeholder="Εισάγετε email" id="email" />	
				<button type="button" id="register_btn" style="margin: 8px 0px 0px 8px;">Εγγραφή</button>
			</div>
			<div class="container" id = "message" style="background-color:#f1f1f1; display:none; width: 90%;"></div>
				
			</div>
		</form>
	</body>
</html>