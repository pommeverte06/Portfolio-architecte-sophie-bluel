const filters = document.querySelector(".filters");

let filter = "0";

const getWorks = async () => {
  try {
    const datas = await fetch("http://localhost:5678/api/works");
    const works = await datas.json();
    return works;
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }
};

const showWorks = (works) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach((work) => {
    //ajouter une condition avec let filter
    if (filter === "0" || work.categoryId === filter) {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
  });
};

getWorks().then((works) => showWorks(works));

const getCategories = async () => {
  try {
    const datas = await fetch("http://localhost:5678/api/categories");
    const categories = await datas.json();
    const filters = document.querySelector(".filters");

    const tous = document.getElementById("0");
    tous.addEventListener("click", () => {
      console.log(0);
      filter = "0"; // filtre 0 pour toutes les catégories
      getWorks(); // Recharger les travaux avec le nouveau filtre
    });

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.id = category.id;
      button.textContent = category.name;
      filters.appendChild(button);
      button.addEventListener("click", () => {
        console.log(category.id);
        filter = category.id; // filtre avec l'id de la catégorie choisie
        getWorks();
      });
    });
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }
};
getWorks();
getCategories();

//******************************************************** */
//creation lien de modifs
const userModifier = document.querySelector(".user-modifier");

const divModifier = document.createElement("div");

const iconModifier = document.createElement("i");
iconModifier.classList.add("far", "fa-pen-to-square");

const textModifier = document.createTextNode(" modifier");

divModifier.appendChild(iconModifier);
divModifier.appendChild(textModifier);
userModifier.appendChild(divModifier);

//************************************************************** */
//creation modale
const modale = document.getElementById("modale");

const modalGallery = document.createElement("div");

const modalText = document.createElement("span");
modalText.textContent = "Galerie photo";
modalText.classList.add("modal-text");

const iconModal = document.createElement("i");
iconModal.classList.add("fas", "fa-times", "close-modale");

modalGallery.appendChild(modalText);
modalGallery.appendChild(iconModal);
modale.appendChild(modalGallery);

//******************************************************* */
// Fonction pour ouvrir la modale
async function openModal() {
  if (modale) {
    modale.classList.remove("hidden");
    modale.style.visibility = "visible"; // Affiche la modale
    const works = await getWorks();
    console.log(works);
    works.forEach((work) => {
      console.log(work);//completer la boucle afficher les images
      //appel 
    });
  }
}
// Fonction pour fermer la modale
function closeModal() {
  if (modale) {
    modale.style.visibility = "hidden"; // Cache la modale
    modale.classList.add("hidden");
  }
}

// Événement pour ouvrir la modale
userModifier.addEventListener("click", () => {
  openModal();
});

// Événement pour fermer la modale
iconModal.addEventListener("click", () => {
  closeModal();
});

// Événement pour fermer la modale en cliquant en dehors de la modal-wrapper
window.addEventListener("click", (event) => {
  if (event.target === modale) {
    closeModal();
  }
});
