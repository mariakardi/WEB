<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
		<script src="user_erwt56.js"></script>
		<script src = "https://code.jquery.com/jquery-1.10.2.js"></script>
      	<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
		<script src="../../logout/logout.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
		<link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel = "stylesheet">
		<?php 
			session_start();
			if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
				header("Location:../../index.php");
			}
			else if($_SESSION['user_type'] == "admin"){
				header("Location:../../admin/erwt1/admin_erwt1.php");
			}
		?>
	</head>
	<body>
		<?php
			include_once("../../layout/header.php");
			include_once("../user_menu.php");
		?>
		<div class = "container">
			<form class="form-inline" action="/action_page.php" style="padding:50px">				<!-- series of labels in a row !-->
				<div class="form-group">
					<label>Ημερομηνία διάγνωσης:</label>
					<input type="text" class="form-control" id="diagdate">
				</div>
				<button type="button" class="btn btn-primary" onclick = "submitCase()">Δήλωση κρούσματος</button>
			</form>
		</div><br><hr>
		<div style="padding:50px">
			<h3>Μέρη που ήρθατε σε επαφή με κρουσμα</h3><br><br>
			<table id="case_table" class="table" style = "display : none"></table>
		</div>


		<?php
			include_once("../../layout/footer.php");
		?>
	</body>
</html>