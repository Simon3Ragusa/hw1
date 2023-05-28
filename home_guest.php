<?php
    require_once 'auth.php';

    if(checkAuth()){
        header("Location: home.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "home.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <script src = "home_guest.js" defer = "true"></script>
        <title>CORN</title>

        <!-- Aggiungi gli stili CSS di Slick
        <link rel="stylesheet" type="text/css" href="slick-theme.css"/>
        <link rel="stylesheet" type="text/css" href= "slick.css"/>

        Includi jQuery
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        Includi il file JavaScript di Slick 
        <script src="slick.min.js"></script>-->
    </head>

    <body>
        <header>
            <nav>
                <a href = "home_guest.php" class = "logo">
                    <img src = "corn_logo.png"/>
                    <h1 id = "main-title"><div><span>C</span>ORN&nbsp;</div><div><span>V</span>ALLEY</div></h1>
                </a>

                <div id = "links">
                    <a href = ''>THE TEAM</a>
                    <a href = 'search_results.php'>DISCOVER</a>
                    <a class = 'button' id = 'top' href = 'login.php'>LOG IN</a>
                </div>

                <a class = 'button' id = 'mobile-top' href = 'login.php'>LOG IN</a>
            </nav>

            <div id = "search_section">
                <div id = "overlay"></div>
                <div id = "title-quote">Come down the rabbit hole</div>
                <section class = "input-box" id = "search-input">
                    <form id = "search" method = "get" action = "search_results.php" autocomplete = "off">
                        
                        <input type = "text" name = "search" class = "search-bar">
                        <input class = "button" type = "submit" value = "Cerca">
                    </form>
                    <label for = "search">Cerca film, persone o altri contenuti</label>
                </section>
            </div>
        </header>

                        
        <section class = "carousel">
            <div class = "content-type">FILM DEL MOMENTO:</div>
            <div class = "carousel-container"  id = "popular-section">

            </div>
        </section>

        <section class = "carousel">
            <div class = "content-type">PERSONE POPOLARI:</div>
            <div class = "carousel-container"  id = "trending-people"></div>
        </section>

        <section class = "carousel">
            <div class = "content-type">WATCH LIST:</div>
            <div class = "carousel-container"  id = "watch-list">
                <div class = 'redirect'>
                    <div>Registrati o accedi per sbloccare la watchlist e tutte le funzioni social</div>
                    <a class = 'button' href = 'login.php'>LOG IN</a>
                </div>
            </div>      
        </section>

        <section class = "carousel">
            <div class = "content-type">IN USCITA:</div>
            <div class = "carousel-container"  id = "upcoming"></div>
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