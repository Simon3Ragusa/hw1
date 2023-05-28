<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "Errore";
        exit;
    }

    if(isset($_GET['q'])){
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

        $userid = mysqli_real_escape_string($conn, $userid);
        $id = mysqli_real_escape_string($conn, $_GET['q']);

        $query = "DELETE from watch_list where movie_id = '$id' and user_id = '$userid'";
        mysqli_query($conn, $query);

        if(mysqli_query($conn, $query)){
            echo json_encode(array('removed' => $id));
            mysqli_close($conn);
            exit;
        }
        else{
            echo json_encode(array('removed' => false));
            mysqli_close($conn);
            exit;
        }
    }

    echo json_encode(array('removed' => false));


?>