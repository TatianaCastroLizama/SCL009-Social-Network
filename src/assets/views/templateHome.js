import{loginGoogle}from "./../js/auth.js";
import{validateAndSignIn}from "./../js/validation.js";


export const templateHome = () => {

document.getElementById("root").innerHTML =

    `
    <header>
        <div class="container-col">
            <img class="logo" src="assets/img/logo_full.png" alt="">
            <h2 class="subtitle">La red social para amantes del Teatro<br>Crea tu personaje e interactua con otros, como en una obra de teatro.</h2>
        </div>
    </header>
    <hr class="hr-home-top">
    <div class="container-col-center">
        <div class="col-inputs">
            <p id="error-fb" class="p-error-fb"></p>
            <input type="email" id="email-signin" class="input-signin" placeholder="Ingrese su correo" />
            <p id="error-email-signin" class="p-error"></p>
            <input type="password" id="password-signin" class="input-signin" placeholder="Ingrese su contraseña" />
            <p id="error-password-signin" class="p-error"></p>
            <div class="row-btn-signin">
                <button class="btn-signin" id="btn-signin">Login</button>
            </div>
            <div class="row-btn-google">
                <button class="btn-google-login" id="btn-google-login">&nbsp&nbsp&nbspEntrar con Google</button>
            </div>
        </div>
    </div>
        
        <div>
            <hr class="hr-home-bot">
        </div>

    <div class="container-col-center">
            <h2 class="subtitle-register">¿No tienes una cuenta?</h2>
        <div class="row-create-account">
            <button class="btn-register" id="btn-register">Registrarse</button>
        </div>
    </div>`

document.getElementById("btn-google-login").addEventListener('click', ()=>{
loginGoogle()
})

document.getElementById("btn-signin").addEventListener('click', ()=>{
let errorMsgEmail = document.getElementById("error-email-signin");
let errorMsgPassword = document.getElementById("error-password-signin");
let userEmail = document.getElementById("email-signin").value;
let userPassword = document.getElementById("password-signin").value;
 validateAndSignIn(errorMsgEmail,errorMsgPassword,userEmail,userPassword)
})

document.getElementById("btn-register").addEventListener('click', ()=>{

   window.location.hash= "#/create";
})
}
 
    
