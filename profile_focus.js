const user_ids = document.querySelectorAll(".bridge");

const userid = user_ids[0].textContent;
const logged = user_ids[1].textContent;
const copertina = user_ids[2].textContent;
console.log("Cercato:");
console.log(userid);
console.log("Loggato:");
console.log(logged);
console.log(copertina);

//---------------------------INIZIALIZZO COPERTINA-----------------------//
const back = document.querySelector("#cover-image");

switch (copertina){
    case 'red':
        back.style.backgroundColor = 'red';
        break;
    case 'blue':
        back.style.backgroundColor = 'blue';
        break;
    case 'yellow':
        back.style.backgroundColor = 'yellow';
        break;
    case 'green':
        back.style.backgroundColor = 'green';
        break;
}

//------------------------------INIZIALIZZO WATCHLIST----------------------//

let watch_list = {};

fetch("inizialize_watch_list_get.php?q="+userid).then(dispatchResponse).then(watchListJson);

function dispatchResponse(response){
    
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
            
            element.appendChild(poster);
            element.appendChild(title);

            if(logged === userid){
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
                element.appendChild(interaction);
            }

            element.classList.add("carousel-item");

            collector.appendChild(element);
            
            watch_list[movie.movie_id] = true;

            //aggiungo il listener per aprire il focus sul film
            poster.addEventListener("click", filmFocus);
        }

        console.log("WATCH LIST:");
        console.log(watch_list);
    }
}

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

function removeToWatch(event){
    event.preventDefault();

    const element = event.currentTarget.parentNode.parentNode;

    fetch("remove_from_watchlist.php?q="+element.dataset.id).then(dispatchResponse).then(databaseResponse);
}

function databaseResponse(json) {
    if(json.toLog){
        window.location.href = "login.php";
    }
    else if(json.removed){
        fetch("inizialize_watch_list.php").then(dispatchResponse).then(watchListJson);
        console.log(json);
        const watchListButton = document.getElementById(json.removed);
        if(watchListButton !== null){
            watchListButton.textContent = 'Aggiungi alla watchlist';
            watchListButton.addEventListener("click", saveToWatch);
        }
    }
    else if(json.insert){
        fetch("inizialize_watch_list.php").then(watchListResponse).then(watchListJson);
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


//-----------------------INIZIALIZZO LISTA DI AMICI------------------//

fetch("inizialize_friends_get.php?q="+userid).then(dispatchResponse).then(friendsJson);

function friendsJson(json){
    console.log(json);

    friends = {};

    results = json.results;

    if(json.ok && !json.empty){
        //ci sono amici
        console.log("ci sono amici!!!");
        for(let i of results){
            friends[i] = true;

            console.log("FRIENDS LIST: ");
            console.log(friends);

            user_container = document.getElementById("friends-list");
            user_container.innerHTML = '';
            fetch("search_user_id.php?q=" + i).then(dispatchResponse).then(userJson);
        }
    }

    

}

function userJson(json){
    console.log(json);

    const results = json.results;

    user_container = document.getElementById("friends-list");

    if(json.found){
        for(let instance of results){
            const user_instance = document.createElement("div");
            user_instance.classList.add("user_instance");
            user_instance.dataset.id = instance.user_id;
    
            const propic = document.createElement("div");
            propic.classList.add("propic-style");
            propic.style.backgroundImage = "url(" + instance.profile_pic + ")";
    
            const user_info = document.createElement("div");
            user_info.classList.add("user-info");
            
            const username = document.createElement("h1");
            username.textContent = instance.username;
            username.classList.add("clickable");
            username.addEventListener("click", function(){
                window.location.href = "profile_focus.php?q=" + user_instance.dataset.id;
            })
    
            const complete_name = document.createElement("h4");
            complete_name.textContent = capitalizeFirstLetter(instance.nome) + ' ' +  capitalizeFirstLetter(instance.cognome);
    
            const remove = document.createElement("div");
            remove.classList.add('remove');
            const mobile_remove = document.createElement("div");
            mobile_remove.classList.add("mobile_remove");
            
            remove.textContent = 'Rimuovi dagli amici';
            remove.addEventListener("click", removeFromFriends);

            mobile_remove.textContent = 'Rimuovi dagli amici';
            mobile_remove.addEventListener("click", removeFromFriends);
    
            user_instance.appendChild(propic);
            user_info.appendChild(username);
            user_info.appendChild(complete_name);
            user_instance.appendChild(user_info);
            user_instance.appendChild(remove);
            user_info.appendChild(mobile_remove);

            user_container.appendChild(user_instance);
            
        }
    }
    else{
        const no_users = document.createElement("h1");
        no_users.classList.add("not-found");
        no_users.textContent = 'La lista di amici è vuo';

        user_container.appendChild(no_users);
    }
    
}

function removeFromFriends(event){

}

//------------------------FUNZIONI UTILI-----------------//
document.querySelector("#propic").addEventListener("click", function(){
    document.getElementById("menu").classList.toggle("show");
})

document.getElementById("logout-btn").addEventListener("click", function(){
    document.getElementById("menu").classList.toggle("show");
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

document.querySelector("#modify-pic").addEventListener("click", openModal);

function openModal(event){
    event.preventDefault();

    modale.classList.remove('hidden');

    document.body.classList.add('no-scroll');

    document.querySelector("#close-modal-button").addEventListener("click", closeModal);
}

function closeModal(event){

    const modale = document.getElementById('modale');
    modale.classList.add('hidden');

    removeEventListener('click', closeModal);
    document.body.classList.remove('no-scroll');
}


//------------------------MODIFICA PROFILO---------------------//
//document.querySelector("#modify-form").addEventListener("submit", modifyProfile);

function modifyProfile(event){
    event.preventDefault();

    const nome = document.querySelector(".nome input");
    const cognome = document.querySelector(".cognome input");
    const username = document.querySelector(".username input");
    const propic = document.querySelector(".propic input");
    const choice = document.querySelector(".copertina select");

    console.log(nome.value);
    console.log(cognome.value);
    console.log(username.value);
    console.log(propic.value);
    console.log(choice.value);

    /*form = new FormData();
    
    form.append(nome.value);
    form.append(cognome.value);
    form.append(username.value);
    form.append(propic.value);
    form.append(choice.value);

    form.submit()*/
}