<?php
    require_once 'auth.php';

    if(!($userid = checkAuth())){
        //se non c'è una sessione torno 0
        echo json_encode($userid);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $query = "SELECT * from watch_list where user_id = '$userid'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if(mysqli_num_rows($res) == 0){
        //vuol dire che la watch list è vuota
        echo json_encode(array('empty' => true));
        mysqli_close($conn);
        exit;
    }

    $watch_list = array();

    while($row = mysqli_fetch_assoc($res)){
        $watch_list[] = array('empty' => false,'movie_id' => $row['movie_id'], 'title' => $row['title'], 'poster' => $row['poster'], 'overview' => $row['overview'], 'popularity' => $row['popularity'], 'release_date' => $row['releaseDate']);
    }
    
    echo json_encode($watch_list);

?>