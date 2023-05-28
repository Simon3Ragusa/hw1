<?php
    require_once 'auth.php';

    if(!($loggedUser = checkAuth())){
        header("Location: home_guest.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="en">

    <?php 
        // Carico le info dell'utente loggato
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = mysqli_real_escape_string($conn, $loggedUser);
        $query = "SELECT * FROM users WHERE id = ".$userid."";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1); 
        
        //carico le info dell'utente passato
        if(isset($_GET['q'])){
            $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
            $searchedUser = $_GET['q'];
            $userid = mysqli_real_escape_string($conn, $searchedUser);
            $query = "SELECT * FROM users WHERE id = ".$userid."";
            $res_1 = mysqli_query($conn, $query);
            $searchedUserinfo = mysqli_fetch_assoc($res_1); 
        }
    ?>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "home.css"/>
        <link rel = "stylesheet" href = "profile_focus.css">
        <link rel = "stylesheet" href = "social_page.css">
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <script src = "profile_focus.js" defer = "true"></script>
        <title>CORN</title>
    </head>

    <body>

        <?php
            echo "<div class = 'bridge hidden'>$searchedUser</div>";
            echo "<div class = 'bridge hidden'>$loggedUser</div>";
            echo "<div class = 'bridge hidden'>".$searchedUserinfo['copertina']."</div>"
        ?>

        <article id="modale" class="hidden">
            <div class = "form-container">
                <img id = "close-modal-button" class = "clickable" src = "go_back.png">
                <p class="title">Modifica Account</p>

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

                <form id = "modify-form" name = "modify-form" autocomplete = "off" method = "post" action = "modify_profile.php" enctype="multipart/form-data">
                    <div class = "input-group nome">
                        <label for = "nome">Modifica il nome</label>
                        <input type = "text" name = "nome" <?php if(isset($userinfo["nome"])){echo "value=".$userinfo["nome"];} ?>>
                    </div>
                    
                    <div class = "input-group cognome">
                        <label for = "cognome">Modifica il cognome</label>
                        <input type = "text" name = "cognome" <?php if(isset($userinfo["cognome"])){echo "value=".$userinfo["cognome"];} ?>>
                    </div>
                    

                    <div class = "input-group username">
                        <label for = "username">Modifica lo username</label>
                        <input type = "text" name = "username" <?php if(isset($userinfo["username"])){echo "value=".$userinfo["username"];} ?>>
                    </div>
                    

                    <div class = "input-group propic">
                        <label for = "propic">Modifica o aggiungi un immagine profilo</label>
                        <input type = "file" name = "propic">
                    </div>
                    

                    <div class = "input-group copertina">
                        <label for = "copertina">Scegli il colore della tua immagine di copertina</label>
                        <select name = "copertina">
                            <option value='red'>RED</option>
                            <option value='green'>GREEN</option>
                            <option value='blue'>BLUE</option>
                            <option value='yellow'>YELLOW</option>
                        </select>
                    </div>
                    
                    <div class="sign">
                        <input class = "button" type = "submit" value = "INVIA MODIFICHE">
                    </div>
                </form>
            </div>
            
		</article>

        <header>

            <nav>
                <a href = "home_guest.php" class = "logo">
                    <img src = "corn_logo.png"/>
                    <h1 id = "main-title"><div><span>C</span>ORN&nbsp;</div><div><span>V</span>ALLEY</div></h1>
                </a>

                <div id = "links">
                    <a href = 'search_results.php'>DISCOVER</a>
                    <a href = 'social_page.php'>SOCIAL</a>
                    <div id = "propic-container" class = "dropdown-btn">
                        <div id = "propic" style = "background-image: url('<?php echo $userinfo['profile_pic'];?>');">
                        </div>
                        <div id = "menu" class = "dropdown-content">
                            <a class = "mobile-links" href = 'search_results.php'>DISCOVER</a>
                            <a class = "mobile-links" href = 'social_page.php'>SOCIAL</a>
                            <a id = "modify-profile" href = "profile_focus.php?q=<?php echo $loggedUser?>">PROFILO</a>
                            <a id = "logout-btn" href = "logout.php">LOGOUT</a>
                        </div>    
                    </div>
                </div>
            </nav>

            <div id = "cover-image">
            </div>
        </header>

        <div id = "focus-container">
            <div id = "propic-focus" style = "background-image: url('<?php echo $searchedUserinfo['profile_pic'];?>');"></div>
            <div id = "user-info">
                <?php
                    echo "<div>USERNAME: ".$searchedUserinfo['username']."</div>";
                    echo "<div>NOME COMLPETO: ".$searchedUserinfo['nome']." ".$searchedUserinfo['cognome']."</div>";
                    if($loggedUser == $searchedUser){
                       echo "<div id = 'modify-pic' class = 'clickable'>Modifica profilo</div>";
                    }
                ?>
            </div>
        </div>

        <section class = "carousel">
            <div class = "content-type">WATCH LIST:</div>
            <div class = "carousel-container"  id = "watch-list"></div>
        </section>

        <section class = "carousel">
            <div class = "content-type">LISTA DI AMICI:</div>
            <div class = "carousel-container"  id = "friends-list">
            </div>      
        </section>
        

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