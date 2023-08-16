<?php
    session_start();
    if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
		header("Location:../../index.php");
	}
	else if($_SESSION['user_type'] == "admin"){
		header("Location:../../admin/erwt1/admin_erwt1.php");
	}
	//header("Content-Type: application/json; charset=UTF-8");
	include_once("../../common/connect.php");
    $query = "SELECT * FROM cases WHERE user = '".$_SESSION['user_id']."'";
    $result = $mysql_link->query($query);
    while($row = $result->fetch_assoc()){
        $date =new DateTime($row["case_date"]);
        $date_new = new DateTime($_POST["dateOfCase"]);
       // $datediff = $date_new - $date;
        $diff = $date->diff($date_new);
        if( $diff->d<= 14){
            echo -1;
            return;
        }
    }
    $sql = "INSERT INTO cases(user, case_date) VALUES('".$_SESSION['user_id'] ."', '".$_POST["dateOfCase"]."')";
    $result = $mysql_link->query($sql);
    echo $result;

?>