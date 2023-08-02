// Mostrar e esconder senha
const password = document.querySelector('.Password');
const icon = document.querySelector('.icon-eyes');
const confirmPassword = document.querySelector('.ConfirmPassword');

function showHide() {
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        confirmPassword.setAttribute('type', 'text');
        icon.classList.add('hide');

    } else {
        password.setAttribute('type', 'password');
        confirmPassword.setAttribute('type', 'password');
        icon.classList.remove('hide');
    }
}

// Validação do login
const form = document.querySelector("#form");
const emailInput = document.querySelector("#Email");
const userInput = document.querySelector("#username");
const btnConfirm = document.querySelector("#join-up");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (username.value === "" || !isUserValid(userInput.value) || !validateUsername(userInput.value, 5)) {
        swal({
            title: "Username Invalid",
            text: "Insira um username válido com 5 digitos ou mais",
            icon: "error",
        });

        return;
    }

    if (Email.value === "" || !isEmailValid(emailInput.value)) {
        swal({
            title: "Email Invalid!",
            text: "Insira um email válido",
            icon: "error",
        });

        return;
    }

    if (!validatePassword(password.value, 6)) {
        swal({
            title: "Password Invalid!",
            text: "Insira uma senha com 6 digitos ou mais",
            icon: "error",
        });
        return;
    }

    if (!validateSecondPassword(password.value, confirmPassword.value)) {
        swal({
            title: "Password Invalid!",
            text: "Insira a senha correta",
            icon: "error",
        });
        return;
    }

    if (!register(form)){

        firebase.auth().createUserWithEmailAndPassword(
            emailInput.value, password.value
        ).then(() => {
            swal({
                title: "Registrado com sucesso",
                text: "",
                icon: "success",
            })
            window.location.replace("../index.html");
        }).catch(error => {
            getErrorMessage(error);
        });

        return;
    }  

    form.submit()
});

function isUserValid(username) {
    const userRegex = new RegExp(
        /^[a-zA-Z0-9._-]{2,}$/
    );

    if (userRegex.test(username)) {
        return true;
    }

    return false;
}

function validateUsername(username, minDigits) {
    if (username.length >= minDigits) {
        return true;
    }

    return false;
}

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    if (emailRegex.test(email)) {
        return true;
    }

    return false;
}

function validatePassword(password, minDigits) {
    if (password.length >= minDigits) {
        return true;
    }

    return false;
}

function validateSecondPassword(password, confirmPassword) {
    if (password === confirmPassword) {
        return true;
    }

    return false;
}

// Login com GOOGLE
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    if (!entrarLogin(data)) {
        swal({
            title: "Registrado com sucesso",
            text: "",
            icon: "success",
        })

        window.location.replace("../TelaInicial/paginaInicial.html");
        
        return;
    }
    
    console.log(data);
  }
  
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "527187363393-1ccdl88vvun1oqv5jc6gtdia01ce9q52.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
      document.getElementById("JoinGoogle"),
      { theme: "outline", 
      size: "large", 
      type:"icon",
      shape:"circle",
      text:"signin_with",
      locale:"en-US" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  function entrarLogin(data) {
    if (data === true) {
        return true;
    }

    return false;
}

// Registrar Usuário
function register(form){

    firebase.auth().createUserWithEmailAndPassword(
        emailInput, password
    ).then(() => {
        window.location.replace("../index.html");
    }).catch(error => {
        getErrorMessage(error);
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        swal({
            title: "Email já está em uso",
            text: "",
            icon: "error",
        });
        
        return;
    }

    return;
}
 
