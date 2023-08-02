// Mostrar senha e esconder
const password = document.querySelector(".Password");
const icon = document.querySelector(".icon-eyes");

function showHide() {
    if (password.type === "password") {
        password.setAttribute("type", "text");
        icon.classList.add('hide');

    } else {
        password.setAttribute("type", "password");
        icon.classList.remove("hide");
    }
};

// Validação do login
const form = document.querySelector("#form");
const emailInput = document.querySelector("#email");
const btnConfirm = document.querySelector("#join-up");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (email.value === "" || !isEmailValid(emailInput.value)) {
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
            text: "Insira a senha correta",
            icon: "error",
        });
        return;
    }

    if (!login(form)) {
        firebase.auth().signInWithEmailAndPassword(
        form.email.value, form.Password.value
        ).then(response => {
            swal({
                title: "Login sucedido",
                text: "Seja Bem-Vindo!",
                icon: "success",
            });
            window.location.replace("../TelaInicial/telaprincipal.html");
    }).catch(error => {
        getErrorMessage(error);
    });

        return;
    }

    form.submit();
});


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

function login(form) {
    firebase.auth().signInWithEmailAndPassword(
        form.email.value, form.Password.value
        ).then(response => {
            window.location.replace("../TelaInicial/telaprincipal.html");
    }).catch(error => {
        getErrorMessage(error);
    });   
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        swal({
            title: "Usuário não encontrado",
            text: "",
            icon: "error",
        });
        
        return;
    }

    if(error.code == "auth/wrong-password"){
        swal({
            title: "Senha inválida",
            text: "",
            icon: "error",
        });

        return;
    }

    return;
 }
// Login com GOOGLE
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    if (!entrarLogin(data)) {
        swal({
            title: "Login Sucedido",
            text: "",
            icon: "success",
        })

        window.location.replace("../TelaInicial/telaprincipal.html");

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
        {
            theme: "outline",
            size: "large",
            type: "icon",
            shape: "circle",
            text: "signin_with",
            locale: "en-US"
        }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
}

function entrarLogin(data) {
    if (data === true) {
        return true;
    }

    return false;
}

