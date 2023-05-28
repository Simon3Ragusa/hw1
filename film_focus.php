<?php
    require_once 'auth.php';
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "home.css">
        <link rel = "stylesheet" href = "film_focus.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">
        <script src = "film_focus.js" defer = "true"></script>
        <title>Document</title>
    </head>
    <body>

        <?php
            if(isset($_POST['id'])){
                echo "<div class = 'bridge hidden'>".$_POST['id']."</div>";
                echo "<div class = 'bridge hidden'>".$_POST['title']."</div>";
                echo "<div class = 'bridge hidden'>".$_POST['poster']."</div>";
                echo "<div class = 'bridge hidden'>".$_POST['overview']."</div>";
                echo "<div class = 'bridge hidden'>".$_POST['releaseDate']."</div>";
                echo "<div class = 'bridge hidden'>".$_POST['popularity']."</div>";
                echo "<div class = 'bridge hidden'>".$_POST['imdb_id']."</div>";
            
            }

            if($userid = checkAuth()){
                $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
                $userid = mysqli_real_escape_string($conn, $userid);
                $query = "SELECT * FROM users WHERE id = $userid";
                $res_1 = mysqli_query($conn, $query);
                $userinfo = mysqli_fetch_assoc($res_1);
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
                            echo "<a href = 'profile_focus.php?q=".$userid."'>PROFILO</a>";
                        }
                    ?>
                    <a href = <?php if($userid){echo "'watch_list.php'";}else{echo "'login.php'";}?>>WATCH LIST</a>
                </div>
            </nav>
        </header>

        <a id = "go-back" href = "home.php">
                <img src = "go_back.png">
                <div>TORNA ALLA HOME</div>
        </a>

        <div id = "movie-info">
            <div id = "poster" class = "carousel-item"></div>
            <div id = "content-info">
                <h1 id = "title"></h1>
                <h6 id = "genres"></h6>
                <div id = "director"></div>
                <div id = "description"></div>
                <div id = "interactions">
                    <div class = "toWatch"></div>
                    <div id = "like">Like</div>
                    <div id = "watched">Watched</div>
                </div>
                <!--<div id = "providers-info"></div>-->
            </div>
        </div>

        <div id = "cast" class = "carousel">
            <div class = "content-type">Cast</div>
            <div id = "cast-section" class = "wrap-contatiner"></div>
        </div>

        <!--<div id = "media" class = "carousel">

        </div>-->

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