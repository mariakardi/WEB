<?php
	session_start();
    include_once("../common/connect.php");

	$query = "SELECT username, email, type
			  FROM users
              WHERE username = '".$_POST["username"]."' AND password = '".$_POST["password"]."'";
	$result = $mysql_link->query($query);
	if (mysqli_num_rows($result) == 1) { 
		$row = $result->fetch_array();
		$_SESSION["user_id"] =  $row["username"];
		$_SESSION["email"] = $row["email"];
		$_SESSION["user_type"] = $row["type"];
		echo $_SESSION["user_type"];
		print_r($_SESSION);
	}
	else{	
		echo 1;
	}
	$mysql_link->close();
?>