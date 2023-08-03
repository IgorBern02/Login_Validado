document.addEventListener('DOMContentLoaded', () => {
    new TypeIt("#sejaBemVindo", {
        speed: 60,
        waitUntilVisible: true,
      })
        .type("Seeja", { delay: 300 })
        .move(-3)
        .delete(1)
        .type("")
        .move(null, { to: "END" })
        .type(" Beemm")
        .pause(400)
        .move(-1)
        .delete(2)
        .type("")
        .move(null, { to: "END" })
        .type("<em> -Vindo </em>")
        .move(null, { to: "END" })
        .pause(400)
        .delete(7)
        .type("-Vindo")
        .move(null, { to: "END" })
        .pause(400)
        .go();
 });

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.replace("./index.html");
  }).catch(() => {
    swal({
      title: "Erro ao fazer logout",
      text: "Seja Bem-Vindo!",
      icon: "error",
  });
  });
}
