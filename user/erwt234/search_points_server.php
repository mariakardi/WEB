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
    $sql = "SELECT *
            FROM pois
            INNER JOIN popular_times ON pois.id = poi_id
            WHERE types LIKE '%".$_POST["type"]."%'";               //type tis vasis


    $result = $mysql_link->query($sql);
    $data = array();
    while($row = $result->fetch_assoc()){
        $data[$row["poi_id"]]["popularity"][$row["day"]][$row["hour"]] = $row["popularity"];
        $data[$row["poi_id"]]["name"] = $row["name"];
        $data[$row["poi_id"]]["types"] = explode(",",$row["types"]);
        $data[$row["poi_id"]]["adress"] =  $row["adress"];
        $data[$row["poi_id"]]["rating"] = $row["rating"];
        $data[$row["poi_id"]]["location"] = array("lat"=> $row["lat"], "lng"=> $row["lng"]);
    }
    echo json_encode($data);
?>