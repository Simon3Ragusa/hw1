//--------------------CARICO IN MEMORIA LA WATCHLIST----------------------/
let watch_list = {};

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


//estraggo il valore passato nella richiesta
const data = document.querySelectorAll(".bridge");

const tmdb_id = data[0].textContent;
console.log('tmdb: ' + tmdb_id);

const title = data[1].textContent;
console.log('title: ' + title);

const poster = data[2].textContent;
console.log('poster: ' + poster);

const overview = data[3].textContent;
console.log('overview: ' + overview);

const releaseDate = data[4].textContent;
console.log('realease date: ' + releaseDate);

const popularity = data[5].textContent;
console.log('popularity: ' + popularity);

const imdb_id = data[6].textContent;
console.log('imdb: ' + imdb_id);

fetch("imdb_film_search.php?q="+encodeURIComponent(imdb_id)).then(dispatchResponse).then(imdbJson);

function dispatchResponse(response){
    return response.json();
}

function imdbJson(json){
    console.log(json);

    const title = document.querySelector("#title");
    title.textContent = json.title;

    const poster = document.createElement("img");
    poster.src = json.image;

    
    document.getElementById("poster").appendChild(poster);

    //document.querySelector("#poster").appendChild(poster_container);

    const cast = json.actorList;

    for(let actor of cast){
        if(actor.asCharacter !== '' && actor.image !== null && !actor.image.includes('nopicture')){
            const element = document.createElement('div');
            element.dataset.imdb_id = actor.id;

            const img = document.createElement('div');
            img.classList.add("div-image");
            img.style.backgroundImage = "url('"+actor.image+"')";

            const quote = document.createElement('h1');
            quote.textContent = actor.name + ' as ' + actor.asCharacter,

            element.appendChild(img);
            element.appendChild(quote);

            element.classList.add('carousel-item');

            
            document.querySelector("#cast-section").appendChild(element);
        }
    }

    const genres = document.querySelector("#genres");
    for(let i = 0; i < json.genreList.length; i++){
        genres.textContent = genres.textContent + json.genreList[i].value + ', ';
    }

    const director = document.querySelector("#director");
    director.textContent = 'DIRECTOR: '+ json.directors;

    const description = document.querySelector("#description");
    description.textContent = json.plot;

    document.querySelector(".toWatch").id = tmdb_id;

    if(tmdb_id in watch_list){
        document.querySelector(".toWatch").textContent = 'x Rimuovi dalla watchlist';
        document.querySelector(".toWatch").addEventListener("click", removeToWatch);
    }
    else{
        document.querySelector(".toWatch").textContent = '+ Aggiungi alla watchlist';
        document.querySelector(".toWatch").addEventListener("click", saveToWatch);
    }

}


//------------------------FUNZIONALITà WATCHLIST----------------------//
function saveToWatch(event){
    event.preventDefault();

    const formData = new FormData();

    formData.append('id', tmdb_id);
    formData.append('title', title);
    formData.append('poster', "https://image.tmdb.org/t/p/w500" + poster);
    formData.append('overview', overview);
    formData.append('releaseDate', releaseDate);
    formData.append('popularity', popularity);

    fetch("to_watch_film.php", {method: 'post', body: formData}).then(dispatchResponse).then(databaseResponse);
    event.stopPropagation();
}

function removeToWatch(event){
    event.preventDefault();

    const element = event.currentTarget

    fetch("remove_from_watchlist.php?q="+element.id).then(dispatchResponse).then(databaseResponse);
}

function dispatchResponse(response){
    return response.json();
}

function databaseResponse(json) {
    if(json.toLog){
        window.location.href = "login.php";
    }else if(json.removed){
        const watchListButton = document.getElementById(json.removed);
        watchListButton.textContent = '+ Aggiungi alla watchlist';
        watchListButton.addEventListener("click", saveToWatch);
    }else if(json.insert){
        const watchListButton = document.getElementById(json.insert);
        watchListButton.textContent = 'x Rimuovi dalla watchlist';
        watchListButton.addEventListener("click", removeToWatch);
    }
}

//--------------------------------------------------------------------//

