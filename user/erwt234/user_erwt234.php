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
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"/>
		<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css"/>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js"></script>
		<script src="user_erwt234.js"></script>
		<script src="../../logout/logout.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
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
			<div class = "row">
				<div class = "col-lg-2">
					<div class = "form-group">
						<label class = "control-label">Τύπος επιχείρησης</label> 
					</div>
				</div>
				<div class = "col-lg-8">
					<div class = "form-group">
						<select class="form-control" id = "types" disabled> //ενεργοποιειται μονο οταν πατησουμε πανω στον χαρτη
						</select>
					</div>
				</div>
				<div class = "col-lg-2">
					<div class = "form-group">
						<button class = "btn btn-block btn-primary" id = "search" disabled>Αναζήτηση</button> 
					</div>
				</div>
			</div>
			<div class = "row">
				
			</div>
			<div id = "row" style = "margin:50px">
			<div id = "map_container" style = "text-align: center" class = "col-lg-8">	
				<div id = "map" style="width:840px; height: 400px; display: inline-block"></div>
			</div>
		</div>
		</div>

		<?php
			include_once("../../layout/footer.php");
		?>
	</body>
</html>