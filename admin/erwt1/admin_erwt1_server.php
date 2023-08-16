<?php
	session_start();
	// if(!isset($_SESSION["user_id"])){
	// 	header("Location:index.php");
	// }
	// if($_SESSION["usertype"] != "user"){
	// 	header("Location:admin.php");
	// }
	if(!file_exists($_FILES["file"]["name"]))
	{
		move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"]);
	}
	include_once("../../common/connect.php");
	$file = file_get_contents($_FILES["file"]["name"]);
	$data = json_decode($file);
	$types_query = "INSERT IGNORE INTO types(type) VALUES";
	$pois_query = "INSERT IGNORE INTO pois(id, name, adress, types, lat, lng, rating) VALUES";
	$poptimes_query = "INSERT IGNORE INTO popular_times(poi_id, day, hour, popularity) VALUES";
	$poi_ids = array();
    foreach($data as $poi){
		foreach($poi->types as $type){
		 	$types_query .= "('".$type."'),";
		}

		if(!in_array($poi->id, $poi_ids)){
			$poi_ids[] = $poi->id;
			if(isset($poi->rating)){
				$pois_query .="('".$poi->id."', '".$mysql_link->real_escape_string($poi->name)."', '".$poi->address."', '".implode(",", $poi->types)."', ".$poi->coordinates->lat.", ".$poi->coordinates->lng.", ".$poi->rating."),";
			}
			else{
				$pois_query .="('".$poi->id."', '".$mysql_link->real_escape_string($poi->name)."', '".$poi->address."', '".implode(",", $poi->types)."', ".$poi->coordinates->lat.", ".$poi->coordinates->lng.", NULL),";
			}
		
			for($i = 0; $i< count($poi->populartimes); $i++){
				for($j = 0; $j< count($poi->populartimes[$i]->data); $j++){
					$poptimes_query .= "('".$poi->id."', ".$i.", ".$j.", ".$poi->populartimes[$i]->data[$j]."),";
				}
			}
    	}
	}
	
	if($mysql_link->query(substr($types_query ,0,-1))){
		echo 1;
	}
	else{
		echo 0;
	} 
	if($mysql_link->query(substr($pois_query ,0,-1))){
		echo 1;
	}
	else{
		echo 0;
	} 
	if($mysql_link->query(substr($poptimes_query ,0,-1))){
		echo 1;
	}
	else{
		echo 0;
	} 
	$mysql_link->close();
?>