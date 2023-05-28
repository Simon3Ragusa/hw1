<?php
    require_once 'auth.php';

    if(!($userid = checkAuth())){
        header("Location: home_guest.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="en">

    <?php 
        // Carico le informazioni dell'utente loggato per visualizzarle nella sidebar (mobile)
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = mysqli_real_escape_string($conn, $userid);
        $query = "SELECT * FROM users WHERE id = $userid";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1);   
    ?>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "home.css"/>
        <link rel = "stylesheet" href = "social_page.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <script src = "social_page.js" defer = "true"></script>
        <title>CORN</title>

        <!-- Aggiungi gli stili CSS di Slick
        <link rel="stylesheet" type="text/css" href="slick-theme.css"/>
        <link rel="stylesheet" type="text/css" href= "slick.css"/>

        Includi jQuery
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        Includi il file JavaScript di Slick 
        <script src="slick.min.js"></script>-->
    </head>

    <?php
        echo "<div class = 'bridge'>".$userid."</div>";
    ?>

    <body>
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
                            <a id = "modify-profile" href = "profile_focus.php?q=<?php echo $userid?>">PROFILO</a>
                            <a id = "logout-btn" href = "logout.php">LOGOUT</a>
                        </div>    
                    </div>
                </div>
            </nav>
        </header>

        <div id = "research" class = "carousel">
            <h1 id = "title-quote">Cerca altri utenti:</h1>
            <form id = "people-input">
                <input type = "text" name = "username" id = "username" class = "search-bar" placeholder = "Inserisci uno username" autocomplete = "off">
                <input class = "button" type = "submit" value = "Cerca">
            </form>

            <div id = "notification-button" class = "dropdown-btn">
            <div id = "icon-container">
                <div id = "not-count"></div>
                <div id = "icon"></div>
            </div>
            <div id = "notification-bar" class = "dropdown-content">
            </div>
        </div>
        </div>

        <div id = "user-list">
            <!--<div class = "user-instance">
                <div id = "propic"></div>
                <div id = "user-info"></div>   
            </div>-->
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