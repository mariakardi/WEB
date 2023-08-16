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
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.css"></link>
		<script src="admin_erwt2g.js"></script>
		<script src="../../logout/logout.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
		<?php
		session_start();
		if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
			header("Location:../../index.php");
		}
		else if($_SESSION['user_type'] == "user"){
			header("Location:../../user/erwt2/user_erwt2.php");
		}
		?>
	</head>
	<body>
		<?php
			include_once("../../layout/header.php");
			include_once("../admin_menu.php");
		?>
		<form  id = "search_form" style = "margin:50px">
            <div class = "container">
                <div class = "row">
                    <div class = "col-lg-3">
						<div class = "form-group">
							<label class = "control-label">Ημερομηνία </label> 
						</div>
					</div>
                    <div class = "col-lg-3">
						<div class = "form-group">
                            <input class="form-control" type="text" id="datepicker">
						</div>
					</div>
                </div>
                <div class = "row">
                    <div class ="col-lg-9 col-lg-offset-3" >
                        <div class="form-check" style = "display:none" id="visitDiv">
                            <input class="form-check-input" type="checkbox" value="" id="visitCheck"  checked>
                            <label class="form-check-label">Μεταβολή επισκέψεων</label>
                        </div>
                    </div>
                    
                </div>
                <div class = "row">
                    <div class ="col-lg-9 col-lg-offset-3" >
                            <div class="form-check"style = "display:none" id="casesDiv">
                                <input class="form-check-input" type="checkbox" value="" id="caseCheck" checked>
                                <label class="form-check-label">Μεταβολή επισκέψεων Κρουσμάτων</label>
                            </div>
                    </div>
                </div>
                <div class = "row">
					<div class = "col-lg-3 col-lg-offset-3">
						<div class = "form-group">
							<button class = "btn btn-block btn-primary" id = "search">Αναζήτηση</button>
						</div>
					</div>
				</div>
            </div>
            <div class= "form-group" id = "message" style = "display: none">
			</div>
			<div id = "row" style = "margin:50px">
				<div id = "chart_container2" style = "text-align: center">	
					<canvas id="chart_search2" style="width:640px; height: 400px; display: inline-block"></canvas>
				</div>
			</div>
        </form>
		<?php
			include_once("../../layout/footer.php");
		?>
	</body>
</html>