<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "non dovresti essere qui";
        exit;
    }

    if(isset($_GET['q'])){

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $amico = $_GET['q'];

        $query = "DELETE from richiesta where sender = $amico and receiver = $userid";

        $res = mysqli_query($conn, $query);

        if($res){
            //è andato a buon fine
            echo json_encode(array("ok" => true, "amico" => $amico));
            mysqli_close($conn);
            exit;
        }
        else{
            echo json_encode(array("ok" => false));
            mysqli_close($conn);
            exit;
        }
    }

    echo json_encode(array("ok" => false));
    mysqli_close($conn);
    exit;
?>