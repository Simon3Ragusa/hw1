<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "non dovresti essere qui";
        exit;
    }

    if(isset($_GET['q'])){

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $amico = $_GET['q'];

        $query = "INSERT into amicizia(user_id, amico) values('$userid', '$amico')";

        $res = mysqli_query($conn, $query);

        if($res){
            $query = "INSERT into amicizia(user_id, amico) values('$amico', '$userid')";

            $res = mysqli_query($conn, $query);
            if($res){
                //è andato a buon fine
                $query = "UPDATE richiesta set stato = 1 where sender = $amico and receiver = $userid";
                $res = mysqli_query($conn, $query);

                if($res){
                    echo json_encode(array("ok" => true));
                    mysqli_close($conn);
                    exit;
                }
                else{
                    echo json_encode(array("ok" => false));
                    mysqli_close($conn);
                    exit;
                }
            }
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

