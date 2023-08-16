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
    
    $sql =    "SELECT user, date_visit, poi_id
                FROM visits v
                WHERE user != '".$_SESSION["user_id"]."' AND (date_visit >= CURDATE() - INTERVAL 7 DAY)  AND
                        EXISTS(SELECT * FROM cases WHERE (case_date BETWEEN v.date_visit AND v.date_visit + INTERVAL 7 DAY) and user = v.user)";
                $result = $mysql_link->query($sql);
    $visits = array();
    $cases = array();
    while($row = $result->fetch_assoc()){
        //$visits[] = array("name" => $row["name"], "address" => $row["adress"], "date" => $row["date_visit"]);
        $sql = "SELECT name, adress,date_visit
                FROM visits
                INNER JOIN pois ON pois.id = visits.poi_id
                WHERE poi_id ='".$row["poi_id"]."' AND date_visit BETWEEN DATE_SUB('".$row["date_visit"]."', INTERVAL 2 HOUR) AND DATE_ADD('".$row["date_visit"]."', INTERVAL 2 HOUR)
                AND user = '".$_SESSION["user_id"]."'";
                $result2 = $mysql_link->query($sql);
        while($row2 = $result2->fetch_assoc()){
            $cases[] = array("name" => $row2["name"], "adress" => $row2["adress"], "date_visit" => $row2["date_visit"]);
        }
        
    }

    
    echo json_encode($cases);
?>