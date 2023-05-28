<?php
    require_once 'auth.php';

    if(!($loggedUser = checkAuth())){
        header("Location: home_guest.php");
        exit;
    }

    // Carico le info dell'utente loggato
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $loggedUser);
    $query = "SELECT * FROM users WHERE id = ".$userid."";
    $res_1 = mysqli_query($conn, $query);
    $userinfo = mysqli_fetch_assoc($res_1); 
    

    //verifico l'esistenza dei dati in input
    if(!empty($_POST["nome"]) && !empty($_POST["cognome"]) && !empty($_POST["username"]) && !empty($_POST["copertina"])){
            $error = array();
            $conn = mysqli_connect($dbconfig["host"], $dbconfig["user"], $dbconfig["password"], $dbconfig["name"]) or die(mysqli_error($conn));

            //verifico la validità dei dati inseriti
            #USERNAME
            // Controlla che l'username rispetti il pattern specificato
            if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])){
                $error[] = "Username non valido";
            }
            else{
                $username = mysqli_real_escape_string($conn, $_POST['username']);

                // Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
                $query = "SELECT username FROM users WHERE username = '$username'";
                $res = mysqli_query($conn, $query);

                if(mysqli_num_rows($res) > 0){
                    $tmp = mysqli_fetch_assoc($res);
                    if($tmp['username'] != $username){
                        $error[] = "Username già utilizzato";
                    }
                }
                
            }

            if ($_FILES['propic']['size'] != 0 && $_FILES['propic'] != $userinfo) {
                $file = $_FILES['propic'];
                $type = exif_imagetype($file['tmp_name']);
                $allowedExt = array(IMAGETYPE_PNG => 'png', IMAGETYPE_JPEG => 'jpg', IMAGETYPE_GIF => 'gif');
                if (isset($allowedExt[$type])) {
                    if ($file['error'] === 0) {
                        if ($file['size'] < 7000000) {
                            $fileNameNew = uniqid('', true).".".$allowedExt[$type];
                            $fileDestination = $fileNameNew;
                            move_uploaded_file($file['tmp_name'], $fileDestination);

                            $query = "UPDATE users set profile_pic = '$fileDestination' where id = $loggedUser";
                            if (!mysqli_query($conn, $query)) {
                                $error[] = "Errore di connessione al Database";
                                exit;
                            }
                        } else {
                            $error[] = "L'immagine non deve avere dimensioni maggiori di 7MB";
                        }
                    } else {
                        $error[] = "Errore nel carimento del file";
                    }
                } else {
                    $error[] = "I formati consentiti sono .png, .jpeg, .jpg e .gif";
                }
            }

            print_r($error);

            //se tutto è andato bene dovrei entrare qui
            # REGISTRAZIONE NEL DATABASE
            if (count($error) == 0) {
                $name = mysqli_real_escape_string($conn, $_POST['nome']);
                $surname = mysqli_real_escape_string($conn, $_POST['cognome']);
                $username = mysqli_real_escape_string($conn, $_POST['username']);
                $color = mysqli_real_escape_string($conn, $_POST['copertina']);

                $query = "UPDATE users set nome = '$name', cognome = '$surname', username = '$username', copertina = '$color' where id = $loggedUser";
                //$query = "UPDATE set nome = '$name' where id = $loggedUser";
                
                if (mysqli_query($conn, $query)) {
                    $_SESSION["username"] = $_POST["username"];
                    mysqli_close($conn);
                    header("Location: profile_focus.php?q=".$loggedUser);
                    exit;
                } else {
                    $error[] = "Errore di connessione al Database";
                }
            }
            
            mysqli_close($conn);
        }

?>