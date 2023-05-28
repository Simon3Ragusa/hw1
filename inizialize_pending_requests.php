<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "non dovresti essere qui";
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $query = "SELECT u.id from users u join richiesta r on u.id = receiver and sender = $userid where stato = 0";

    $res = mysqli_query($conn, $query);

    if(mysqli_num_rows($res) == 0){
        //non ci sono richieste pending
        echo json_encode(array("ok" => true, "empty" => true,));
        mysqli_close($conn);
        exit;
    }
    else{
        //ci sono richieste
        $result = array();

        while($row = mysqli_fetch_assoc($res)){
            $result[] = $row['id'];
        }

        echo json_encode(array("ok" => true, "empty" => false, "results" => $result));
        mysqli_close($conn);
        exit;
    }
?>