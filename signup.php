<?php
    //includo auth.php che avvia una sessione e include il file di configurazione
    //dei parametri del database
    require_once 'auth.php';

    if (checkAuth()) {
        header("Location: home.php");
        exit;
    }

    //verifico l'esistenza dei dati in input
    if(!empty($_POST["nome"]) && !empty($_POST["cognome"]) && !empty($_POST["email"])
        && !empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["conferma-password"])){
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
                if (mysqli_num_rows($res) > 0) {
                    $error[] = "Username già utilizzato";
                }
            }
            # PASSWORD
            if (strlen($_POST["password"]) < 8) {
                $error[] = "Caratteri password insufficienti";
            } 
            # CONFERMA PASSWORD
            if (strcmp($_POST["password"], $_POST["conferma-password"]) != 0) {
                $error[] = "Le password non coincidono";
            }
            # EMAIL
            if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                $error[] = "Email non valida";
            } else {
                $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
                $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
                if (mysqli_num_rows($res) > 0) {
                    $error[] = "Email già utilizzata";
                }
            }

            //se tutto è andato bene dovrei entrare qui
            # REGISTRAZIONE NEL DATABASE
            if (count($error) == 0) {
                $name = mysqli_real_escape_string($conn, $_POST['nome']);
                $surname = mysqli_real_escape_string($conn, $_POST['cognome']);
                $email = mysqli_real_escape_string($conn, $_POST['email']);
                $username = mysqli_real_escape_string($conn, $_POST['username']);
                $password = mysqli_real_escape_string($conn, $_POST['password']);
                $password = password_hash($password, PASSWORD_BCRYPT);

                $query = "INSERT INTO users(nome, cognome, email, username, password, profile_pic) VALUES('$name', '$surname', '$email', '$username', '$password', 'default_profile.png')";
                
                if (mysqli_query($conn, $query)) {
                    $_SESSION["username"] = $_POST["username"];
                    $_SESSION["id"] = mysqli_insert_id($conn);
                    mysqli_close($conn);
                    header("Location: home.php");
                    exit;
                } else {
                    $error[] = "Errore di connessione al Database";
                }
            }
            
            mysqli_close($conn);
        }
        else if (isset($_POST["username"])){
            $error = array("Riempi tutti i campi");
        }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "signup.css">
        <link rel = "stylesheet" href = "home.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <script src = "signup.js" defer = "true"></script>
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
            <p class="title">Create Account</p>

            <?php
                // Verifica la presenza di errori
                if (isset($error)){
                    foreach($error as $err){
                        echo "<div class='error'>
                                <img src = 'error.png'>
                                <p>$err</p>
                          </div>";
                    }
                }  
            ?>

            <form class="form" method = "post">

                <div id = "data">
                    <div class = "form-section" id = "personal-data">
                        <div class="input-group nome">
                            <label for="nome">Nome</label>
                            <input type="text" name="nome" id="nome" autocomplete = "off" <?php if(isset($_POST["nome"])){echo "value=".$_POST["nome"];} ?>>
                            <div class = "error hidden">Devi inserire il tuo nome</div>
                        </div>

                        <div class="input-group cognome">
                            <label for="cognome">Cognome</label>
                            <input type="text" name="cognome" id="cognome" autocomplete = "off" <?php if(isset($_POST["cognome"])){echo "value=".$_POST["cognome"];} ?>>
                            <div class = "error hidden">Devi inserire il tuo cognome</div>
                        </div>

                        <div class="input-group email">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" autocomplete = "off" <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>>
                            <div class = "error hidden"></div>
                        </div>
                    </div>

                    <div class = "form-section" id = "account-data">
                        <div class="input-group username">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" autocomplete = "off" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
                            <div class = "error hidden"></div>
                        </div>

                        <div class="input-group password">
                            <label for="password">Password</label>
                            <input type="password" placeholder = "Almeno 8 caratteri" name="password" id="password">
                            <div class = "error hidden">Inserisci almeno 8 caratteri</div>
                        </div>

                        <div class="input-group confirm-password">
                            <label for="conferma-password">Conferma password</label>
                            <input type="password" name="conferma-password" id="conferma-password">
                            <div class = "error hidden">Le password non coincidono</div>
                        </div>

                    </div>
                </div>

                <div class="sign">
                    <input class = "button" type = "submit" value = "SIGN IN">
                </div>
            </form>
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