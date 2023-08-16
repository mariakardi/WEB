<?php
    session_start();
    if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../index.php");
	}
	else if($_SESSION['user_type'] == "admin"){
		header("Location:../../admin/erwt1/admin_erwt1.php");
	}

	header("Content-Type: application/json; charset=UTF-8");

	include_once("../../common/connect.php");
	
    $sql = "SELECT * FROM users WHERE username = '".$_SESSION['user_id']."'";
    $result = $mysql_link->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode(array("username"=>$row['username'], "password" => $row['password']));
?>