<?php
    require_once "dbconfig.php";

    if(!isset($_GET['q'])){
        echo "Non dovresti essere qui";
        exit;
    }

    $conn = mysqli_connect($dbconfig["host"], $dbconfig["user"], $dbconfig["password"], $dbconfig["name"]) or die(mysqli_error($conn));

    $username = mysqli_real_escape_string($conn, $_GET["q"]);

    $query = "SELECT * from users where username = '".$username."'";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if(mysqli_num_rows($res) > 0){
        echo json_encode(array('exists' => true));
    }
    else{
        echo json_encode(array('exists' => false));
    }
?>