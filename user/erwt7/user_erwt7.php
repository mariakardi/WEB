<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
		<script src="user_erwt7.js"></script>
		<script src="../../logout/logout.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>

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
		
			<ul id ="erwt7_tab" class="nav nav-tabs" style ="margin: 50px">
				<li class="active" id = "tab1"><a data-toggle="tab" href="#menu1">Βασικά στατιστικά</a></li>
				<li id = "tab1"><a data-toggle="tab" href="#menu2">Αλλαγή στοιχείων</a></li>
			</ul>
			<div class = "tab-content">
				<div id = "menu1" class="tab-pane fade in active" style ="margin: 50px">
                    <h3>Ιστορικό επισκέψεων</h3><br><br>
                    <table id="visits_table" class="table" style = "display : none"></table>
                    <h3>Δηλώσεις κρουσμάτων</h3>
                    <table id="cases_table" class="table" style = "display : none"></table>
				</div>
				<div id = "menu2"class="tab-pane fade" style ="margin: 50px">
                    <form>
                        <div class="form-group">
                            <label for="username">Όνομα χρήστη:</label>
                            <input type="text" class="form-control" id="username" disabled>
                        </div>
                        <div class="form-group">
                            <label for="pwd">Password:</label>
                            <input type="text" class="form-control" id="pwd">
                        </div>
                        <button type="button" id="change_btn" class="btn btn-default"  onclick="changeButtonClick()" disabled>Αλλαγή</button>
                    </form>
				</div>
		</div>
		<div class= "form-group" id = "message" style = "display: none">
		</div>
		<?php
			include_once("../../layout/footer.php");
		?>
	</body>
</html>