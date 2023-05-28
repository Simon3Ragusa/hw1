<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "non dovresti essere qui";
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $query = "SELECT * from amicizia where user_id = $userid";

    $res = mysqli_query($conn, $query);

    if(mysqli_num_rows($res) == 0){
        //non ci sono amici
        echo json_encode(array("ok" => true, "empty" => true));
        mysqli_close($conn);
        exit;
    }
    else{
        $results = array();

        while($row = mysqli_fetch_assoc($res)){
            $results[] = $row['amico'];
        }

        echo json_encode(array("ok" => true, "empty" => false, "results" => $results));
        mysqli_close($conn);
        exit;
    }

    echo json_encode(array("ok" => false));
        mysqli_close($conn);
        exit;
?>