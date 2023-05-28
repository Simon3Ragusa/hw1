function checkPassword(event) {
    const pw = event.currentTarget;

    if(pw.value.lenght !== 0){
        pw.classList.add("check");
    }
}

function checkUsername(event){
    const un = event.currentTarget;

    if(un.value.lenght !== 0){
        un.classList.add("check");
    }
}


document.querySelector("#username").addEventListener("blur", checkUsername);
document.querySelector("#password").addEventListener("blur", checkPassword);