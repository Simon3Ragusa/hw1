const userid = document.querySelector(".bridge").textContent;
let friends = {};
let pending_requests = {};

//-----------------INIZIALIZZIAMO LE RICHIESTE-------------------//
fetch("inizialize_requests.php").then(dispatchResponse).then(requestsJson);
fetch("inizialize_pending_requests.php").then(dispatchResponse).then(pendingJson);

//-----------------INIZIALIZZIAMO LA LISTA DEGLI AMICI-------------------------//
fetch("inizialize_friends.php").then(dispatchResponse).then(friendsJson);

function friendsJson(json){
    console.log(json);

    friends = {};

    results = json.results;

    if(json.ok && !json.empty){
        //ci sono amici
        for(let i of results){
            friends[i] = true;
        }
    }

    console.log(friends);
}

function requestsJson(json){
    console.log(json);

    document.querySelector("#notification-bar").innerHTML = '';
    document.querySelector("#not-count").textContent = '';
    

    if(json.ok && json.empty){
        const empty_message = document.createElement("div");
        empty_message.textContent = 'Nessuna richiesta in arrivo';
        document.querySelector("#notification-bar").appendChild(empty_message);
    }
    else if(json.ok && !json.empty){

        document.querySelector("#not-count").textContent = json.results.length;
        const not_bar = document.querySelector("#notification-bar");

        const quote = document.createElement("div");
        quote.textContent = 'Richieste da: ';

        not_bar.appendChild(quote);

        for(let i of json.results){
            fetch("search_user.php?q="+ i).then(dispatchResponse).then(notificationJson);
        }
    }
}

function notificationJson(json){
    console.log(json);

    const results = json.results;

    if(json.found){
        for(let instance of results){
            const user_instance = document.createElement("div");
            user_instance.classList.add("notification");
            user_instance.dataset.id = instance.user_id;

            const username = document.createElement("div");
            username.classList.add("clickable");
            username.textContent = 'USERNAME: ' + instance.username;
            username.addEventListener("click", checkProfile);

            const complete_name = document.createElement("div");
            complete_name.textContent = 'NOME COMPLETO: ' + instance.nome + ' ' + instance.cognome;

            user_instance.appendChild(username);
            user_instance.appendChild(complete_name);

            const interaction = document.createElement("div");
            interaction.classList.add("choices");

            const accept_button = document.createElement("div");
            accept_button.textContent = 'ACCETTA';
            accept_button.classList.add("clickable");
            accept_button.addEventListener("click", acceptRequest);

            const refuse_button = document.createElement("div");
            refuse_button.textContent = 'RIFIUTA';
            refuse_button.classList.add("clickable")
            refuse_button.addEventListener("click", refuseRequest);

            interaction.appendChild(accept_button);
            interaction.appendChild(refuse_button);

            user_instance.appendChild(interaction);

            document.querySelector("#notification-bar").appendChild(user_instance);
        }
    }
}

//-------------------GESTIONE RICHIESTE-------------------------//

function acceptRequest(event){
    event.preventDefault();

    const sender = event.currentTarget.parentNode.parentNode.dataset.id;
    fetch("accept_request.php?q="+sender).then(dispatchResponse).then(requestResponse);
}

function refuseRequest(event){
    event.preventDefault();

    const sender = event.currentTarget.parentNode.parentNode.dataset.id;
    console.log(sender);
    fetch("refuse_request.php?q="+sender).then(dispatchResponse).then(requestResponse);
}

function requestResponse(json){
    
    console.log(json);

    if(json.ok){
        fetch("inizialize_requests.php").then(dispatchResponse).then(requestsJson);
        fetch("inizialize_friends.php").then(dispatchResponse).then(friendsJson);
    }
    else{
        console.log("ERRORE");
    }
}

function pendingJson(json){

    results = json.results;

    if(!json.empty){
        console.log("Pending array");
        console.log(results);

        pending_requests = {};

        if(results.length !== 0){
            for(let i of results){
                pending_requests[i] = true;
            }
        }

        console.log("Richieste pendenti");
        console.log(pending_requests);
    }
    
}

//------------------VISUALIZZAZIONE PROFILO------------------------//

function checkProfile(event){
    event.preventDefault();

    const user = event.currentTarget.parentNode.dataset.id;
    console.log(user);

    window.location.href = "profile_focus.php?q="+user;
}

//--------------------------------------------------------------//

function searchUser(event){
    event.preventDefault();

    const input = document.querySelector("#username");
    const input_value = encodeURIComponent(input.value);

    fetch("search_user.php?q="+input_value).then(dispatchResponse).then(userJson);
}

function dispatchResponse(response){
    return response.json();
}

function userJson(json){
    console.log("User results:");
    console.log(json);

    const results = json.results;

    user_container = document.getElementById("user-list");
    user_container.innerHTML = '';

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
    
            const request = document.createElement("div");
            request.classList.add('request');

            const mobile_request = document.createElement("div");
            mobile_request.classList.add('mobile_request');

            if(user_instance.dataset.id in pending_requests){
                request.textContent = 'Richiesta inviata';
                mobile_request.textContent = '...';
            }
            else{
                request.textContent = '+ Aggiungi agli amici';
                mobile_request.textContent = '+'
                request.classList.add("clickable");
                mobile_request.classList.add("clickable");
                request.addEventListener("click", sendRequest);
                mobile_request.addEventListener("click", sendRequest);
            }

            user_instance.appendChild(propic);
            user_info.appendChild(username);
            user_info.appendChild(complete_name);
            user_instance.appendChild(user_info);
    
            if(instance.user_id !== userid && !(instance.user_id in friends)){
                user_instance.appendChild(request);
                user_instance.appendChild(mobile_request);
            }

            user_container.appendChild(user_instance);
            
        }
    }
    else{
        const no_users = document.createElement("h1");
        no_users.classList.add("not-found");
        no_users.textContent = 'Nessun risultato trovato';

        user_container.appendChild(no_users);
    }
    
    
}

const form = document.querySelector("form");
form.addEventListener("submit", searchUser);

//--------------FUNZIONI UTILI-----------------//
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

document.querySelector("#notification-button").addEventListener("click", function(){
    document.getElementById("notification-bar").classList.toggle("show");
})


//---------------------------PROPIC---------------------//
document.querySelector("#propic").addEventListener("click", function(){
    document.getElementById("menu").classList.toggle("show");
});

document.getElementById("logout-btn").addEventListener("click", function(){
    document.getElementById("menu").classList.toggle("show");
});


//----------------------RICHIESTA AMICIZIA------------------------//

function sendRequest(event){
    event.preventDefault();

    const user = event.currentTarget.parentNode;

    const form = new FormData();
    form.append("sender", userid);
    form.append("receiver", user.dataset.id);

    fetch("send_request.php", {method: 'post', body: form}).then(dispatchResponse).then(databaseResponse);
    event.stopPropagation();
}

function databaseResponse(json){
    if(json.ok){
        fetch("inizialize_pending_requests.php").then(dispatchResponse).then(pendingJson);
        console.log("richiesta inviata");
        const prova = document.querySelector("[data-id='"+json.requestTo+"']");
        const toChange = prova.querySelector(".request");
        const mobile_toChange = prova.querySelector(".mobile_request");
        toChange.textContent = 'Richiesta inviata';
        toChange.classList.remove("clickable");

        mobile_toChange.textContent = '...';
        mobile_toChange.remove("clickable");
    }
    else{
        console.log("errore");
    }
}

