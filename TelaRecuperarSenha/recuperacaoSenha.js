/*document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    var email = document.getElementById("Email").value;

    // Aqui você pode adicionar a lógica para verificar se o e-mail ou nome de usuário existe no sistema
    // e enviar um e-mail de recuperação com um link exclusivo para redefinir a senha.

    // Exemplo de código para exibir uma mensagem de sucesso ou erro na página:
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Um e-mail de recuperação foi enviado para " + email + ".";
});*/
// Recuperação de Senha
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

    if (!login(form)) {
        firebase.auth().signInWithEmailAndPassword(
            form.email.value, form.Password.value
            ).catch(error => {
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

function login(form) {
    firebase.auth().signInWithEmailAndPassword(
        form.email.value, form.Password.value
        ).catch(error => {
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

 function recoverPassword(){
    firebase.auth().sendPasswordResetEmail(form.email.value).then(() => {
        swal({
            title: "Email enviado com sucesso",
            text: "Crie uma nova senha com o link enviado ao seu Email informado",
            icon: "success",
        });
        window.location.replace("../TelaPrincipal/index.html");
    }).catch(error => {
        getErrorMessage(error);
    });
} 