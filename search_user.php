<?php
    require_once 'auth.php';

    if(!$userid = checkAuth()){
        echo "Non dovresti essere qui";
        exit;
    }

    if(isset($_GET['q'])){
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $query = "SELECT * from users where username like '%".mysqli_real_escape_string($conn, $_GET['q'])."%'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if(mysqli_num_rows($res) == 0){
            //non ci sono occorrenze quindi restituiamo un array con il campo found a false
            echo json_encode(array("ok" => true, "found" => false));
            mysqli_close($conn);
            exit;
        }
        else{

            $results = array();
            while($row = mysqli_fetch_assoc($res)){
                $results[] = array("user_id" => $row['id'], "nome" => $row['nome'],
                "cognome" => $row['cognome'], "email" => $row['email'], "username" => $row['username'],
                "profile_pic" => $row['profile_pic']);
            }

            echo json_encode(array("ok" => true, "found" => true, "results" => $results));
            mysqli_close($conn);
            exit;
        }
    }

    echo json_encode(array("ok" => false));
    mysqli_close($conn);
?>