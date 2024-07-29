const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    // Envoi de la requête POST à l'API
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const userLogin = await response.json();
    console.log(userLogin);
    if (userLogin.token) {
      window.localStorage.setItem("token", userLogin.token);
      window.localStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    } else {
      alert("Erreur dans l'identifiant ou le mot de passe");
      console.log(userLogin);
    }
  } catch (error) {
    alert("Une erreur est survenue");
    console.log(error);
  }
});

//******************************************************************** */

//enlever les filtres dès la connexion ok
document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = window.localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    // Supprimer la barre de filtres
    const filters = document.querySelector(".filters");

    if (filters) {
      filters.classList.add("hidden");
    }
    //ajouter le lien modifier
    const userModifier = document.querySelector(".user-modifier");

    if (userModifier) {
      userModifier.classList.add("active");
    }

    //modif liens login et logout après la connexion
    const logInOut = document.querySelector(".log-in-out");

    if (logInOut) {
      logInOut.textContent = "logout";
      logInOut.href = "#";
      logInOut.addEventListener("click", (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token");
        window.location.href = "index.html";
      });
    }
  }
  //Supprimer l'indicateur de connexion
  window.localStorage.removeItem("loggedIn");
});
