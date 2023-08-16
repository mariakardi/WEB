<nav class="navbar navbar-expand-sm bg-info navbar-light">
	<div class="container-fluid">
		<p class="navbar-text"></p>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt1/admin_erwt1.php">Ανέβασμα αρχείου</a>
		</div>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt2/admin_erwt2.php">Απεικόνιση στοιχείων</a>
		</div>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt2f/admin_erwt2f.php">Διάγραμμα επισκέψεων ανα ημέρα</a>
		</div>
		<div class="navbar-header">
			<a class="navbar-brand" href="../erwt2g/admin_erwt2g.php">Διάγραμμα μεταβολής επισκέψεων</a>
		</div>
		<div class="collapse navbar-collapse" id="myNavbar">
			<form class='navbar-form navbar-right' method = 'post' action = "logout.php">
				<button type='button' class="btn btn-default" name='logout' onclick = "logoutUser()" id='logout'>Αποσύνδεση</button>
			</form>
		</div>
	</div>
</nav>