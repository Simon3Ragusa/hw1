function checkName(event){
    const input = event.currentTarget;

    if (formStatus[input.name] = input.value.length > 0){
        input.classList.remove("empty");
        input.classList.add("check");
        document.querySelector(".nome .error").classList.add("hidden");
    } else {
        input.classList.add('empty');
        input.classList.remove("check");
        document.querySelector(".nome .error").classList.remove("hidden");
    }

    console.log(formStatus);
}

function checkSurname(event){
    const input = event.currentTarget;

    if (formStatus[input.name] = input.value.length > 0){
        input.classList.remove("empty");
        input.classList.add("check");
        document.querySelector(".cognome .error").classList.add("hidden");
    } else {
        input.classList.add('empty');
        input.classList.remove("check");
        document.querySelector(".cognome .error").classList.remove("hidden");
    }

    console.log(formStatus);
}

function checkEmail(event){

    //questa funzione valuta intanto se l'email rispetta i requisiti di sintassi
    const emailInput = event.currentTarget;
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(emailInput.value).toLowerCase())) {
        emailInput.classList.add("empty");
        emailInput.classList.remove("check");
        document.querySelector(".email .error").textContent = 'Email non valida'
        document.querySelector(".email .error").classList.remove("hidden");

        //in caso negativo setta l'errore e aggiorna la mappa degli errori
        formStatus[emailInput.name] = false;

    } else {
        fetch("check_email.php?q="+encodeURIComponent(String(emailInput.value).toLowerCase())).then(fetchResponse).then(jsonCheckEmail);
    }
}

function fetchResponse(response){
    if (!response.ok) return null;
    return response.json();
}

function jsonCheckEmail(json){

    const emailInput = document.querySelector("#email");
    //se torna true stampiamo un errore
    console.log(json.exists);
    if(json.exists === true){
        emailInput.classList.add("empty");
        emailInput.classList.remove("check");
        document.querySelector(".email .error").textContent = 'Email gia in uso'
        document.querySelector(".email .error").classList.remove("hidden");
    }
    else{
        emailInput.classList.remove("empty");
        emailInput.classList.add("check");
        document.querySelector(".email .error").classList.add("hidden");
    }
}

function checkUsername(event){
    const input = event.currentTarget;

    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)) {
        input.classList.add("empty");
        input.classList.remove("check");
        document.querySelector(".username .error").textContent = 'Username non valido'
        document.querySelector(".username .error").classList.remove("hidden");

        //in caso negativo setta l'errore e aggiorna la mappa degli errori
        formStatus[input.name] = false;
    } else {
        fetch("check_username.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckUsername);
    }
}

function jsonCheckUsername(json){

    const usernameInput = document.querySelector("#username");
    //se torna true stampiamo un errore
    console.log(json.exists);
    if(json.exists){
        usernameInput.classList.add("empty");
        usernameInput.classList.remove("check");
        document.querySelector(".username .error").textContent = 'Username gia in uso'
        document.querySelector(".username .error").classList.remove("hidden");
    }
    else{
        usernameInput.classList.remove("empty");
        usernameInput.classList.add("check");
        document.querySelector(".username .error").classList.add("hidden");
    }
}

function checkPassword(event) {
    const passwordInput = event.currentTarget;
    if (formStatus[passwordInput.name] = passwordInput.value.length >= 8) {
        passwordInput.classList.add("check");
        passwordInput.classList.remove("empty");
        document.querySelector(".password .error").classList.add("hidden");
    } else {
        passwordInput.classList.remove("check");
        passwordInput.classList.add("empty");
        document.querySelector(".password .error").classList.remove("hidden");
    }
}

function checkConfirmPassword(event) {
    const confirmPasswordInput = event.currentTarget;
    if (formStatus[confirmPasswordInput.name]= confirmPasswordInput.value === document.querySelector('#password').value) {
        confirmPasswordInput.classList.add("check");
        confirmPasswordInput.classList.remove("empty");
        document.querySelector(".confirm-password .error").classList.add("hidden");
    } else {
        confirmPasswordInput.classList.remove("check");
        confirmPasswordInput.classList.add("empty");
        document.querySelector(".confirm-password .error").classList.remove("hidden");
    }
}

//utilizzo una mappa che a ogni campo associa flase o true se si hanno errori o meno
const formStatus = {};
document.querySelector("#nome").addEventListener("blur", checkName);
document.querySelector("#cognome").addEventListener("blur", checkSurname);
document.querySelector("#email").addEventListener("blur", checkEmail);
document.querySelector("#username").addEventListener("blur", checkUsername);
document.querySelector("#password").addEventListener("blur", checkPassword);

