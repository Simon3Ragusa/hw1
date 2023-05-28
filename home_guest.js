let watch_list = {};

function popMoviesResponse(response){
    return response.json();
}

function popMoviesJson(json){
    console.log("Pop Movies");
    console.log(json);
    const results_movies = json.results;

    for(let i = 0; i < 6; i++){
        /*if(results_movies[i].poster_path !== null){
            const element = document.createElement("div");
            element.dataset.id = results_movies[i].id;
            element.dataset.title = results_movies[i].title;
            element.dataset.poster = results_movies[i].poster_path;
            element.dataset.overview = results_movies[i].overview;
            element.dataset.releaseDate = results_movies[i].release_date;
            element.dataset.popularity = results_movies[i].popularity;

            const title = document.createElement("h1");
            title.textContent = results_movies[i].title;

            const poster = document.createElement('img');
            poster.src = "https://image.tmdb.org/t/p/w500"+ results_movies[i].poster_path;

            const menu = document.createElement("div");
            menu.classList.add("dropdown-content");

            const watchButton = document.createElement("a");
            watchButton.textContent = 'Aggiungi alla watchlist';
            watchButton.addEventListener("click", saveToWatch);

            const likeButton = document.createElement("a");
            likeButton.textContent = 'Aggiungi ai preferiti';

            const watchedButton = document.createElement("a");
            watchedButton.textContent = 'Aggiungi ai film visti';

            const toWatch = document.createElement("div");
            toWatch.classList.add("interaction-button", "to-watch", "dropdown-btn");
            toWatch.textContent = '+';


            element.appendChild(poster);
            element.appendChild(title);
            element.appendChild(toWatch);
            element.appendChild(menu);
            menu.appendChild(watchButton);
            menu.appendChild(likeButton);
            
            element.classList.add("carousel-item");

            const collector = document.getElementById("popular-section");
            collector.appendChild(element);

            toWatch.addEventListener('click', function(){
                menu.classList.toggle("show");
            });

            watchButton.addEventListener('click', function(){
                menu.classList.toggle('show');
            })
        }*/

        const collector = document.querySelector("#popular-section");
        createMovieItem(results_movies[i], collector);
    
    }
}

function popPeopleResponse(response){
    return response.json();
}

function popPeopleJson(json){
    console.log("Persons");
    console.log(json);
    const results_people = json.results;

    for(let i = 0; i < 6; i++){
        if(results_people[i].profile_path !== null){
            const element = document.createElement("div");
            element.dataset.id = results_people[i].id;
            element.dataset.type = results_people[i].known_for_department
            element.dataset.popularity = results_people[i].popularity;
            const name = document.createElement("h1");
            name.textContent = results_people[i].name;
            const poster = document.createElement('img');
            poster.src = "https://image.tmdb.org/t/p/w500"+ results_people[i].profile_path;

            element.appendChild(poster);
            element.appendChild(name);

            element.classList.add("carousel-item");

            const collector = document.getElementById("trending-people");
            collector.appendChild(element);
        }
        
    }
}

function upcomingResponse(response){
    return response.json();
}

function upcomingJson(json){
    console.log("Upcoming");
    console.log(json);
    const results_movies = json.results;

    for(let i = 0; i < 6; i++){
        
        /*if(results_movies[i].poster_path !== null){
            const element = document.createElement("div");
            element.dataset.id = results_movies[i].id;
            element.dataset.title = results_movies[i].title;
            element.dataset.poster = results_movies[i].poster_path;
            element.dataset.overview = results_movies[i].overview;
            element.dataset.releaseDate = results_movies[i].release_date;
            element.dataset.popularity = results_movies[i].popularity;

            const title = document.createElement("h1");
            title.textContent = results_movies[i].title;
            const poster = document.createElement('img');
            poster.src = "https://image.tmdb.org/t/p/w500"+ results_movies[i].poster_path;
            
            const menu = document.createElement("div");
            menu.classList.add("dropdown-content");

            const watchButton = document.createElement("a");
            watchButton.textContent = 'Aggiungi alla watchlist';
            watchButton.addEventListener("click", saveToWatch);

            const likeButton = document.createElement("a");
            likeButton.textContent = 'Aggiungi ai preferiti';

            const watchedButton = document.createElement("a");
            watchedButton.textContent = 'Aggiungi ai film visti';

            const toWatch = document.createElement("div");
            toWatch.classList.add("interaction-button", "to-watch", "dropdown-btn");
            toWatch.textContent = '+';

            const release = document.createElement("h1");
            release.textContent = results_movies[i].release_date;


            element.appendChild(poster);
            element.appendChild(title);
            element.appendChild(release);
            element.appendChild(toWatch);
            element.appendChild(menu);
            menu.appendChild(watchButton);
            menu.appendChild(likeButton);
            
            element.classList.add("carousel-item");

            const collector = document.getElementById("upcoming");
            collector.appendChild(element);

            toWatch.addEventListener('click', function(){
                menu.classList.toggle("show");
            });

            watchButton.addEventListener('click', function(){
                menu.classList.toggle('show');
            })
        }*/

        
        const collector = document.getElementById("upcoming");

        createMovieItem(results_movies[i], collector);
        
    }
}

//-------------------------FUNZIONALITà WATCHLIST----------------------------//

function saveToWatch(event){
    event.preventDefault();

    const element = event.currentTarget.parentNode.parentNode;
    const formData = new FormData();

    formData.append('id', element.dataset.id);
    formData.append('title', element.dataset.title);
    formData.append('poster', "https://image.tmdb.org/t/p/w500"+element.dataset.poster);
    formData.append('overview', element.dataset.overview);
    formData.append('releaseDate', element.dataset.releaseDate);
    formData.append('popularity', element.dataset.popularity);

    fetch("to_watch_film.php", {method: 'post', body: formData}).then(dispatchResponse).then(databaseResponse);
    event.stopPropagation();
}

function dispatchResponse(response){
    return response.json();
}

function databaseResponse(json) {
    if(json.toLog){
        window.location.href = "login.php";
    }
    else if(json.removed){
        fetch("inizialize_watch_list.php").then(watchListResponse).then(watchListJson);
        console.log(json);
        const watchListButton = document.getElementById(json.removed);
        if(watchListButton !== null){
            watchListButton.textContent = 'Aggiungi alla watchlist';
            watchListButton.addEventListener("click", saveToWatch);
        }
    }
    else if(json.insert){
        fetch("inizialize_watch_list.php").then(watchListResponse).then(watchListJson);
        console.log(json);
        const watchListButton = document.getElementById(json.insert);
        if(watchListButton !== null){
            watchListButton.textContent = 'Rimuovi dalla watchlist';
            watchListButton.addEventListener("click", removeToWatch);
        }
        
    }

    /*if(json.toLog){
        window.location.href = "login.php";
    }else if(json.removed){
        const watchListButton = document.getElementById("watch_list_button");
        watchListButton.textContent = 'Aggiungi alla watchlist';
        watchListButton.addEventListener("click", saveToWatch);
    }else{
        const watchListButton = document.getElementById("watch_list_button");
        watchListButton.textContent = 'Rimuovi dalla watchlist';
        watchListButton.addEventListener("click", removeToWatch);
    } */
}

function watchListResponse(response){
    
    return response.json();
}

function watchListJson(json){
    //console.log(json);
    if(json.empty){
        const collector = document.getElementById("watch-list");
        collector.innerHTML = '';
        const message = document.createElement("div");
        message.textContent = 'Visita le sezioni del sito e cerca film da aggiungere alla tua watch list!';
        message.classList.add("redirect");

        collector.appendChild(message);
    }
    else if(!json.empty && json !== 0){

        const collector = document.getElementById("watch-list");
        collector.innerHTML = '';

        watch_list = {};
        for(let movie of json){
            const element = document.createElement("div");
            element.dataset.id = movie.movie_id;
            element.dataset.title = movie.title;
            element.dataset.poster = movie.poster;
            element.dataset.overview = movie.overview;
            element.dataset.releaseDate = movie.release_date;
            element.dataset.popularity = movie.popularity;

            const title = document.createElement("h1");
            title.textContent = movie.title;
            const poster = document.createElement('img');
            poster.src = movie.poster;
            const interaction = document.createElement("div");
            interaction.classList.add("interaction");

            const toRemove = document.createElement("div");
            toRemove.classList.add("interaction-button", "to-remove");
            toRemove.textContent = 'x';
            toRemove.addEventListener("click", removeToWatch);
            //const like = document.createElement("div");
            //like.classList.add("interaction-button", "like");
            interaction.appendChild(toRemove);
            //interaction.appendChild(like);

            element.appendChild(poster);
            element.appendChild(title);
            element.appendChild(interaction);

            element.classList.add("carousel-item");

            collector.appendChild(element);
            
            watch_list[movie.movie_id] = true;

            //aggiungo il listener per aprire il focus sul film
            poster.addEventListener("click", filmFocus);
        }

        console.log(watch_list);

    }
}

function removeToWatch(event){
    event.preventDefault();

    const element = event.currentTarget.parentNode.parentNode;

    fetch("remove_from_watchlist.php?q="+element.dataset.id).then(dispatchResponse).then(databaseResponse);
}

//------------------------------------------------------------------------------------//

//faccio una richiesta a un file php che mi restituisce i contenuti per inizializzare la pagina principale
fetch("inizialize_watch_list.php").then(watchListResponse).then(watchListJson);
fetch("inizialize_pop_movies.php").then(popMoviesResponse).then(popMoviesJson);
fetch("inizialize_pop_people.php").then(popPeopleResponse).then(popPeopleJson);
fetch("inizialize_upcoming.php").then(upcomingResponse).then(upcomingJson);

function createMovieItem(movie, collector){
    if(movie.poster_path !== null && movie.title !== 'undefined'){

        const element = document.createElement("div");
        element.dataset.id = movie.id;
        element.dataset.title = movie.title;
        element.dataset.poster = movie.poster_path;
        element.dataset.overview = movie.overview;
        element.dataset.releaseDate = movie.release_date;
        element.dataset.popularity = movie.popularity;

        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = movie.title;

        const poster = document.createElement('img');
        poster.src = "https://image.tmdb.org/t/p/w500"+ movie.poster_path;

        const menu = document.createElement("div");
        menu.classList.add("dropdown-content");

        const watchListButton = document.createElement("a");
        watchListButton.id = movie.id;
        //removeButton.textContent = 'Aggiungi alla watchlist';
        //removeButton.addEventListener("click", removeToWatch);

        const likeButton = document.createElement("a");
        likeButton.textContent = 'Aggiungi ai preferiti';

        const watchedButton = document.createElement("a");
        watchedButton.textContent = 'Aggiungi ai film visti';

        const toWatch = document.createElement("div");
        toWatch.classList.add("interaction-button", "to-watch", "dropdown-btn");
        toWatch.textContent = '+';


        element.appendChild(poster);
        element.appendChild(title);
        if(collector.id === 'upcoming'){
            const release = document.createElement("h1");
            release.textContent = movie.release_date;

            element.appendChild(release);
        }
        element.appendChild(toWatch);
        element.appendChild(menu);

        if(movie.id in watch_list){
            watchListButton.textContent = 'Rimuovi dalla watchlist';
            watchListButton.addEventListener("click", removeToWatch);
        }
        else{
            watchListButton.textContent = 'Aggiungi alla watchlist';
            watchListButton.addEventListener("click", saveToWatch);
        }

        menu.appendChild(watchListButton);
        menu.appendChild(likeButton);
        
        element.classList.add("carousel-item");

        collector.appendChild(element);
        

        toWatch.addEventListener('click', function(){
            menu.classList.toggle("show");
        });

        watchListButton.addEventListener('click', function(){
            menu.classList.toggle('show');
        })

        //aggiungo il listener per aprire il focus sul film
        poster.addEventListener("click", filmFocus);
    }
}


//------------------------------FILM FOCUS----------------------------//

function filmFocus(event){
    event.preventDefault();

    const clicked = event.currentTarget;

    console.log(clicked.parentNode.dataset.id);
    fetch("film_details.php?q="+ clicked.parentNode.dataset.id).then(dispatchResponse).then(detailsJson);
}

function detailsJson(json){
    console.log(json);

    //window.location.href = "film_focus.php?q="+json.imdb_id+"&background="+json.backdrop_path;

    const form = new FormData();

    form.append("id", json.id);
    form.append("title", json.title);
    form.append("poster", "https://image.tmdb.org/t/p/w500"+ json.poster_path);
    form.append('overview', json.overview);
    form.append('releaseDate', json.release_date);
    form.append('popularity', json.popularity);
    form.append("imdb_id", json.imdb_id);

    redirect(form, "film_focus.php");
}

function redirect(formData, url) {
    var form = document.createElement("form");
    form.classList.add("hidden");
    form.method = "POST";
    form.action = url;
  
    // Aggiungi i campi FormData al modulo nascosto
    for (var pair of formData.entries()) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = pair[0];
      input.value = pair[1];
      form.appendChild(input);
    }
  
    // Aggiungi il modulo nascosto al documento
    document.body.appendChild(form);
  
    // Effettua il reindirizzamento
    form.submit();
}