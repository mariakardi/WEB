<nav class="navbar navbar-expand-sm bg-info navbar-light">
	<div class="container-fluid">
		<p class="navbar-text"><?php echo $_SESSION["user_id"] ?></p>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt234/user_erwt234.php">Σημεία ενδιαφέροντος</a>
		</div>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt56/user_erwt56.php">Διαχείριση Κρουσμάτων</a>
		</div>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt7/user_erwt7.php">Διαχείριση προφιλ</a>
		</div>
		<div class="collapse navbar-collapse" id="myNavbar">
			<form class='navbar-form navbar-right' method = 'post' action = "logout.php">
				<button type = 'button' class="btn btn-default" name='logout' onclick = "logoutUser()" id='logout'>Αποσύνδεση</button>
			</form>
		</div>
	</div>
</nav>