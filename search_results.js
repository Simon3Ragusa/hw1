let watch_list = {};
let number_of_results = 0;

//carichiamo in memoria l'eventuale watch list (noi non sappiamo se l'utente è loggato o no)
fetch("inizialize_watch_list.php").then(watchListResponse).then(watchListJson);

function watchListResponse(response){
    
    return response.json();
}

function watchListJson(json){
    //console.log(json);
    if(json.empty){
        watch_list = {};
        /*const collector = document.getElementById("watch-list");
        collector.innerHTML = '';
        const message = document.createElement("div");
        message.textContent = 'Visita le sezioni del sito e cerca film da aggiungere alla tua watch list!';
        message.classList.add("redirect");

        collector.appendChild(message);*/
    }
    else if(!json.empty && json !== 0){

        //const collector = document.getElementById("watch-list");
        //collector.innerHTML = '';

        watch_list = {};
        for(let movie of json){
            /*const element = document.createElement("div");
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

            collector.appendChild(element);*/
            
            watch_list[movie.movie_id] = true;
        }

        console.log(watch_list);
    }
}

const q = document.querySelector("#bridge");
console.log(encodeURIComponent(q.textContent));

fetch("search_content.php?q="+encodeURIComponent(q.textContent)).then(contentResponse).then(contentJson);

function contentResponse(response){
    return response.json();
}

function contentJson(json){

    document.querySelector("#results-info").classList.remove("hidden");
    //document.querySelector("#side-bar").classList.remove("hidden");

    console.log(json);

    const results = json.results;

    if(results.length !== 0){
        
        number_of_results = 0;

        const results_container = document.querySelector("#result-container");

        results_container.innerHTML = '';

        const movie_results = document.createElement("div");
        movie_results.id = 'movie_results';
        movie_results.classList.add("carousel", "hidden");

        const movieSection = document.createElement("div");
        movieSection.id = "movie-section";
        const movie_type = document.createElement("div");
        movie_type.textContent = 'FILM';
        movie_type.classList.add("content-type");

        movieSection.classList.add("wrap-container");
        movie_results.appendChild(movie_type);
        movie_results.appendChild(movieSection);


        const person_results = document.createElement("div");
        person_results.id = 'person_results';
        person_results.classList.add("carousel", "hidden");

        const personSection = document.createElement("div");
        personSection.id = "person-section";
        const person_type = document.createElement("div");
        person_type.textContent = 'PERSONE';
        person_type.classList.add("content-type");
        personSection.classList.add("wrap-container");
        person_results.appendChild(person_type);
        person_results.append(personSection);


        const other_results = document.createElement("div");
        other_results.id = 'other_results';
        other_results.classList.add("carousel", "hidden");

        const otherSection = document.createElement("div");
        otherSection.id = "other-section";
        const other_type = document.createElement("div");
        other_type.textContent = 'ALTRO';
        other_type.classList.add("content-type");

        otherSection.classList.add("wrap-container");
        other_results.appendChild(other_type);
        other_results.appendChild(otherSection);

        if(results[0].media_type === 'movie'){
            results_container.appendChild(movie_results);
            results_container.appendChild(person_results);
            results_container.appendChild(other_results);
        }
        else if(results[0].media_type === 'person'){
            results_container.appendChild(person_results);
            results_container.appendChild(movie_results);
            results_container.appendChild(other_results);
        }
        else{
            results_container.appendChild(other_results);
            results_container.appendChild(movie_results);
            results_container.appendChild(person_results);
        }

        for(let i = 0; i < results.length; i++){

            if(results[i].media_type === 'person'){
                //carica in person
                number_of_results++;
                if(results[i].profile_path && results[i].name != null){

                    person_results.classList.remove("hidden");
                    const element = document.createElement("div");
                    element.dataset.id = results[i].id;
                    element.dataset.type = results[i].known_for_department
                    element.dataset.popularity = results[i].popularity;

                    const name = document.createElement("h1");
                    name.textContent = results[i].name;

                    const poster = document.createElement('img');
                    poster.src = "https://image.tmdb.org/t/p/w500"+ results[i].profile_path;

                    element.appendChild(poster);
                    element.appendChild(name);

                    element.classList.add("carousel-item");

                    personSection.appendChild(element);

                    if(results[i].known_for.length !== 0){
                        for(let movie of results[i].known_for){
                            if(movie.media_type === 'movie')
                                createMovieItem(movie);
                            else
                                createTvItem(movie);
                        }
                        
                    }
                }
            }
            else if(results[i].media_type === 'movie'){
                //carica in movie
                createMovieItem(results[i]);
            }
            else{
                //carica in other
                createTvItem(results[i]);
            }
        }
    }
    else{
        document.getElementById("number").textContent = 'Nessun risultato trovato';
    }

    document.getElementById("number").textContent ='Risultati trovati: ' + number_of_results;
}

//------------------------FUNZIONALITà WATCHLIST----------------------//
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

function removeToWatch(event){
    event.preventDefault();

    const element = event.currentTarget.parentNode.parentNode;

    fetch("remove_from_watchlist.php?q="+element.dataset.id).then(dispatchResponse).then(databaseResponse);
}

function dispatchResponse(response){
    return response.json();
}

function databaseResponse(json) {
    if(json.toLog){
        window.location.href = "login.php";
    }else if(json.removed){
        const watchListButton = document.getElementById(json.removed);
        watchListButton.textContent = 'Aggiungi alla watchlist';
        watchListButton.addEventListener("click", saveToWatch);
    }else if(json.insert){
        const watchListButton = document.getElementById(json.insert);
        watchListButton.textContent = 'Rimuovi dalla watchlist';
        watchListButton.addEventListener("click", removeToWatch);
    }
}

//--------------------------------------------------------------------//

function createMovieItem(movie){
    if(movie.poster_path !== null && movie.title !== 'undefined'){
        
        number_of_results++;
        document.querySelector("#movie_results").classList.remove("hidden");

        const element = document.createElement("div");
        element.dataset.id = movie.id;
        element.dataset.title = movie.title;
        element.dataset.poster = movie.poster_path;
        element.dataset.overview = movie.overview;
        element.dataset.releaseDate = movie.release_date;
        element.dataset.popularity = movie.popularity;

        const title = document.createElement("h1");
        title.classList.add = "title";
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

        const movieSection = document.querySelector("#movie-section");

        movieSection.appendChild(element);
        

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


function createTvItem(tv){
    if(tv.poster_path !== null && tv.name !== 'undefined'){
        number_of_results++;
        document.querySelector("#other_results").classList.remove("hidden");

        const element = document.createElement("div");
        element.dataset.id = tv.id;
        element.dataset.title = tv.name;
        element.dataset.poster = tv.poster_path;
        element.dataset.overview = tv.overview;
        element.dataset.popularity = tv.popularity;

        const title = document.createElement("h1");
        title.textContent = tv.name;

        const poster = document.createElement('img');
        poster.src = "https://image.tmdb.org/t/p/w500"+ tv.poster_path;

        /*const menu = document.createElement("div");
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
        toWatch.textContent = '+';*/


        element.appendChild(poster);
        element.appendChild(title);
        /*element.appendChild(toWatch);
        element.appendChild(menu);
        menu.appendChild(watchButton);
        menu.appendChild(likeButton);*/
        
        element.classList.add("carousel-item");

        const otherSection = document.querySelector("#other-section");

        otherSection.appendChild(element);
    }
}

//------------------------------FILM FOCUS----------------------------//

function filmFocus(event){
    event.preventDefault();

    const clicked = event.currentTarget;

    console.log(clicked);

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