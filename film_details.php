<?php
    require_once 'auth.php';

    $curl = curl_init();

    if(isset($_GET['q'])){
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.themoviedb.org/3/movie/".urlencode($_GET['q'])."?language=en-US",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ4OGQ1YmI0ZTIxYzBhNDQwNGY3NzU1ZjlkMzAwNCIsInN1YiI6IjY0NjYwNjNjMzNhMzc2MDEzYjNjYzlmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-eGqT2lqxPTTeuznv9RZDZVnaUj76NVZ1heBjrwFheQ",
                "accept: application/json"
            ],
        ]);
    
        $response = curl_exec($curl);
        $err = curl_error($curl);
    
        curl_close($curl);
    
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }
?>