<?php
    $tmdb_auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ4OGQ1YmI0ZTIxYzBhNDQwNGY3NzU1ZjlkMzAwNCIsInN1YiI6IjY0NjYwNjNjMzNhMzc2MDEzYjNjYzlmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-eGqT2lqxPTTeuznv9RZDZVnaUj76NVZ1heBjrwFheQ';
    $curl = curl_init();

    curl_setopt_array($curl, [
      CURLOPT_URL => "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&region=IT&with_release_type=2|3&release_date.gte=2023-05-19&release_date.lte=2023-06-17",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => [
        "Authorization: Bearer ".$tmdb_auth_token,
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
?>