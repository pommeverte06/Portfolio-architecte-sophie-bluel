const getWorks = async () => {
  //c'est une fonction fléchée

  try {
    const datas = await fetch("http://localhost:5678/api/works");
    const works = await datas.json();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    works.forEach((work) => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }
};

getWorks();
//************************************************************************** */

// Variables pour les boutons (globales)
// Récupération de la barre des filtres

// const portfolio = document.getElementById("portfolio");
const barreFiltre = document.querySelector("#portfolio h2");
// Création de la div pour la barre des catégories
const divBarreCategories = document.createElement("div");
barreFiltre.appendChild(divBarreCategories);

// Création des boutons
const tousButton = document.createElement("button");
const objetButton = document.createElement("button");
const appartButton = document.createElement("button");
const hoResButton = document.createElement("button");

// Ajout des boutons à la div des catégories
divBarreCategories.appendChild(tousButton);
divBarreCategories.appendChild(objetButton);
divBarreCategories.appendChild(appartButton);
divBarreCategories.appendChild(hoResButton);

//  barreFiltre = [tousButton, objetButton, appartButton, hoResButton];
//  console.log(barreFiltre);
//************************************************************ */

const getCategories = async () => {
  //c'est une fonction fléchée

  try {
    const datas = await fetch("http://localhost:5678/api/categories");
    const categories = await datas.json();
    console.log(categories);

    function barreFiltre() {
      tousButton.textContent = "Tous";
      objetButton.textContent = categories[0].name;
      appartButton.textContent = categories[1].name;
      hoResButton.textContent = categories[2].name;

      tousButton.addEventListener("click", () => {
        console.log("bouton Tous");
      });

      objetButton.addEventListener("click", () => {
        console.log("bouton Objets");
      });

      appartButton.addEventListener("click", () => {
        console.log("bouton Appartements");
      });

      hoResButton.addEventListener("click", () => {
        console.log("bouton Hôtels restaurants");
      });
    }
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }

  barreFiltre();
};
getWorks();
getCategories();
//***************************************************************** */
