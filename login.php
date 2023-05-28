<?php
    //includo auth.php che avvia una sessione e include il file di configurazione
    //dei parametri del database
    include 'auth.php';

    //se checkAuth ritorna un valore diverso da 0 vuol dire che gia esiste una sessione
    //quindi reindirizziamo alla home
    if(checkAuth()){
        header("Location: home.php");
        exit;
    }

    //se entriamo qui vuol dire che la sessione non esiste e dobbiamo settarla tramite
    //le credenziali dell'utente
    if(!empty($_POST["username"]) && !empty($_POST["password"])){
        //se i dati post sono presenti mi connetto al db e verifico la correttezza
        $conn = mysqli_connect($dbconfig["host"], $dbconfig["user"], $dbconfig["password"], $dbconfig["name"]) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn, $_POST["username"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);

        $query = "SELECT * from users where username = '".$username."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if(mysqli_num_rows($res) != 0){
            //salvo i risultati in un array associativo
            $entry = mysqli_fetch_assoc($res);
            if(password_verify($_POST['password'], $entry['password'])){
                //le credenziali sono corrette quindi avvio una sessione di cui salvo id e username
                $_SESSION["id"] = $entry["id"];
                $_SESSION["username"] = $entry["username"];

                //reindirizzo alla home e chiudo tutto
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }

        //se siamo qui vuol dire che una delle due credenziali non è corretta
        $error = 'Username e/o password errati';
    }
    else if(isset($_POST["username"]) || isset($_POST["password"])){
        //se siamo qui vuol dire che non sono settati username e/o password
        $error = 'Inserisci username e password';
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "login.css">
        <link rel = "stylesheet" href = "home.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <script src = "login.js" defer = "true"></script>
        <title>Document</title>
    </head>

    <body>
        <header>
            <nav>
                <a href = "home_guest.php" class = "logo">
                    <img src = "corn_logo.png"/>
                    <h1 id = "main-title"><div><span>C</span>ORN&nbsp;</div><div><span>V</span>ALLEY</div></h1>
                </a>
            </nav>
        </header>

        <a id = "go-back" href = "home.php">
                <img src = "go_back.png">
                <div>TORNA ALLA HOME</div>
        </a>

        <div class="form-container">
            <p class="title">Login</p>

            <?php
                // Verifica la presenza di errori
                if (isset($error)){
                    echo "<div class='error'>
                                <img src = 'error.png'>
                                <p>$error</p>
                          </div>";
                }  
            ?>

            <form class="form" method = "post">

                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" autocomplete = "off" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password">
                </div>

                <div class="sign">
                    <input class = "button" type = "submit" value = "SIGN IN">
                </div>
            </form>

            <p class="signup">
                <span>Non hai un account? Registrati</span>
                <a href = "signup.php" class = "button">SIGN UP</a>
            </p>
        </div>

        <footer id = "normal-footer">
            <div class="footer-container">
                <div class="footer-col">
                    <h1>CORN VALLEY</h1>
                </div>
                <div class="footer-col">
                    <strong>TEAM</strong>
                    <p>Chi siamo</p>
                </div>
                <div class="footer-col">
                    <strong>SOCIAL</strong>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>GitHub</p>
                </div>
            </div>
        </footer>

        <footer id = "mobile-footer">
            <div class="footer-container">
                <div class="footer-col">
                    <h1>CORN VALLEY</h1>
                </div>
                
                <div class="footer-col-mobile">
                    <div class="footer-col">
                        <strong>TEAM</strong>
                        <p>Chi siamo</p>
                    </div>

                    <div>
                        <strong>SOCIAL</strong>
                        <p>Facebook</p>
                        <p>Instagram</p>
                        <p>GitHub</p>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</html>