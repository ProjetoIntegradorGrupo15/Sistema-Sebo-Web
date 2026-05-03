var ul= document.querySelector('nav ul');
var menuBtn=document.querySelector('.menu-btn i');

ul.classList.add('open');

function menuShow(){
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }

}
const form= document.getElementById("form");
const username= document.getElementById("username");
const email= document.getElementById("e-mail");
const password = document.getElementById("password");
const passwordconfirmation = document.getElementById("password-confirmation");


form.addEventListener("submit", (Event) => {Event.preventDefault();

    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
})

function checkInputUsername(){
    const usernameValue = username.value;

    if(usernameValue==""){
        errorImput(username, "Digite o nome")
    }else{
        const formItem = username.parentElement;
        formItem.className = "form-content"
    }
}
   
function checkInputEmail(){
    const emailValue = email.value;

    if(emailValue==""){
        errorImput(Email, "O e-mail é obrigatório")
    }else{
        const formItem = email.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputPassword(){
    const passwordValue = password.value;

    if(emailValue==""){
        errorImput(password, "A senha é obrigatória")
    }else if(passwordValue,length < 8){
        errorImput(password, "A senha precisa ter no mínimo 8 caracteres")
    } else{
        const formItem = password.parentElement;
        formItem.className = "form-content"
    }
}

function errorImput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-content error"

}