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

