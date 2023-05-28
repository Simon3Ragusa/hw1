<?php
    require_once 'auth.php';
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src = "search_results.js" defer = "true"></script>
        <link rel = "stylesheet" href = "home.css">
        <link rel = "stylesheet" href = "search_results.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <title>Document</title>
    </head>

    <body>

        <?php
            // Carico le informazioni dell'eventuale utente loggato
            if($userid = checkAuth()){
                $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
                $userid = mysqli_real_escape_string($conn, $userid);
                $query = "SELECT * FROM users WHERE id = $userid";
                $res_1 = mysqli_query($conn, $query);
                $userinfo = mysqli_fetch_assoc($res_1);
            }     

            if(isset($_GET['search'])){
                echo "<div id = 'bridge'>".$_GET['search']."</div>";
            }
        ?>

        <header>
            <nav>
                <a href = "home_guest.php" class = "logo">
                    <img src = "corn_logo.png"/>
                    <h1 id = "main-title"><div><span>C</span>ORN&nbsp;</div><div><span>V</span>ALLEY</div></h1>
                </a>

                <div id = "links">
                    <?php
                        if($userid){
                            echo "<a class = 'mobile-links' href = 'profile_focus.php?q=".$userid."'>PROFILO</a>";
                            echo "<a href = 'profile_focus.php?q=".$userid."'>PROFILO</a>";
                        }
                    ?>
                </div>
            </nav>

        </header>

        <a id = "go-back" href = "home.php">
                <img src = "go_back.png">
                <div>TORNA ALLA HOME</div>
        </a>

        <div id = "new-research" class = "carousel">
            <h1>Nuova ricerca:</h1>
            <section class = "input-box" id = "search-input">
                <form id = "search" method = "get" autocomplete = "off">
                    <input type = "text" name = "search" class = "search-bar" value = <?php if(isset($_GET['search'])){echo "'".$_GET['search']."'";}?>>
                    <input class = "button" type = "submit" value = "Cerca">
                </form>
            </section>
        </div>

        <section id = "results-info" class = "carousel hidden">
            <h1 id = "number"></h1>
        </section>

        <section id = "media">
            <div id = "side-bar" class = "carousel hidden"><div class = "content-type">FILTRA:</div></div>
            <div id = "result-container"></div>
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