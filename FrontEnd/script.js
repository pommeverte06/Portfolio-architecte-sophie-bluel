fetch("http://localhost:5678/api/works")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function (data) {
    // Emplacement pour les donnees JSON
    console.log(data);
  })
  .catch(function (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  });

// la barre des boutons de filtres par catégories

//variables pour les noms des boutons chaine de caractere
let tousButtonString = "Tous";
let objetButtonString = "Objets";
let appartButtonString = "Appartements";
let hoResButtonString = "Hôtels & restaurants";

// let portfolio = document.getElementById("portfolio");

let divBarreCategories = document.createElement("div");
let barreFiltre = document.querySelector("#portfolio h2");

barreFiltre.appendChild(divBarreCategories);

let divBarreButtons = `
<button id="tousButton">${tousButtonString}</button>
<button id="objetButton">${objetButtonString}</button>
<button id="appartButton">${appartButtonString}</button>
<button id="hoResButton">${hoResButtonString}</button>
`;

divBarreCategories.innerHTML = divBarreButtons;

let tousButton = document.getElementById("tousButton");
let objetButton = document.getElementById("objetButton");
let appartButton = document.getElementById("appartButton");
let hoResButton = document.getElementById("hoResButton");

// barreFiltre = [tousButton, objetButton, appartButton, hoResButton];
// console.log(barreFiltre);

tousButton.addEventListener("click", function () {
  console.log("bouton Tous");
});

objetButton.addEventListener("click", function () {
  console.log("bouton Objets");
});

appartButton.addEventListener("click", function () {
  console.log("bouton Appartements");
});

hoResButton.addEventListener("click", function () {
  console.log("bouton Hôtels restaurants");
});
