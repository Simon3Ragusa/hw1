<?php
    require_once 'auth.php';

    if (!$userid = checkAuth()){
        echo json_encode(array('toLog' => true));
        exit;
    }
        

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);
    $movie_id = mysqli_real_escape_string($conn, $_POST['id']);
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $poster = mysqli_real_escape_string($conn, $_POST['poster']);
    $overview = mysqli_real_escape_string($conn, $_POST['overview']);
    $popularity = mysqli_real_escape_string($conn, $_POST['popularity']);
    $releaseDate = mysqli_real_escape_string($conn, $_POST['releaseDate']);

    $query = "SELECT * FROM watch_list WHERE user_id = '$userid' AND movie_id = '$movie_id'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    # if movie is already present, do nothing
    if(mysqli_num_rows($res) > 0) {
        echo json_encode(array('insert' => 0));
        mysqli_free_result($res);
        mysqli_close($conn);
        exit;
    }

    # Eseguo
    $query = "INSERT INTO watch_list(movie_id, user_id, title, poster, overview, popularity, releaseDate) VALUES('$movie_id','$userid', '$title', '$poster', '$overview', '$popularity', '$releaseDate')";
    error_log($query);
    # Se corretta, ritorna un JSON con {ok: true}
    if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
        echo json_encode(array('toLog' => false, 'insert' => $movie_id));
        mysqli_free_result($res);
        mysqli_close($conn);
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('toLog' => false, 'insert' => false));
?>