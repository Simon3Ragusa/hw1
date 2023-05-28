<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "Non dovresti essere qui";
    }

    if(isset($_POST['sender']) && isset($_POST['receiver'])){
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
        $sender = $_POST['sender'];
        $receiver = $_POST['receiver'];

        $query = "INSERT into richiesta(sender, receiver, stato) values('$sender', '$receiver', '0')";
        $res = mysqli_query($conn, $query);

        if($res){
            //inserimento andato a buon fine
            echo json_encode(array("ok" => true, "requestTo" => $receiver));
            mysqli_close($conn);
            exit;
        }
        else{
            //inserimento fallito
            echo json_encode(array("ok" => false));
            mysqli_close($conn);
            exit;
        }
    }
     
    echo json_encode(array("ok" => false));
    exit;
?>