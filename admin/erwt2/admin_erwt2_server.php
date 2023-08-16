<?php
    session_start();
    if (!isset( $_SESSION['user_id'] ) && !isset( $_SESSION['user_type'])) {
        header("Location:../../index.php");
    }
    else if($_SESSION['user_type'] == "user"){
        header("Location:../../user/erwt2/user_erwt2.php");
    }
    header("Content-Type: application/json; charset=UTF-8");
	include_once("../../common/connect.php");
    
    $sql =    "SELECT COUNT(*) AS total_visits FROM visits";
    $result = $mysql_link->query($sql);
    $row = $result->fetch_assoc();

    $sql = "SELECT COUNT(*) AS total_cases FROM cases";
    $result2 = $mysql_link->query($sql);
    $row2 = $result2->fetch_assoc();

    $sql = "SELECT COUNT(*) AS visit_cases
            FROM visits v
            WHERE user IN (SELECT user FROM cases WHERE case_date BETWEEN date_sub(v.date_visit, INTERVAL 14 day)  AND date_add(v.date_visit, INTERVAL 7 day) )";
    $result3 = $mysql_link->query($sql);
    $row3 = $result3->fetch_assoc();


    
    echo json_encode(array("tot_visits" => $row["total_visits"], "tot_cases" => $row2["total_cases"], "vis_cases" => $row3["visit_cases"]));
?>