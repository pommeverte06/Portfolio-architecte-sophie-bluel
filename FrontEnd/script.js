// Sélection de l'élément contenant les boutons de filtre
const filters = document.querySelector(".filters");

let filter = "0"; // Variable pour stocker le filtre sélectionné

// Fonction pour récupérer les travaux depuis l'API
const getWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }
};

// Fonction pour afficher les travaux dans la galerie principale
const showWorks = (works) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach((work) => {
    // Condition pour filtrer les travaux selon la catégorie
    if (filter === "0" || work.categoryId.toString() === filter) {
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

// Fonction pour mettre à jour les travaux affichés selon le filtre
const updateWorks = async () => {
  const works = await getWorks();
  showWorks(works);
};

// Fonction pour récupérer les catégories depuis l'API et créer les boutons de filtre
const getCategories = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const tous = document.getElementById("0");
    tous.addEventListener("click", () => {
      filter = "0";
      updateWorks();
    });

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.id = category.id;
      button.textContent = category.name;
      filters.appendChild(button);
      button.addEventListener("click", () => {
        filter = category.id.toString();
        updateWorks();
      });
    });
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }
};

// Initialiser l'affichage des travaux et des catégories
updateWorks();
getCategories();

//***************************************************************** */
// Création du lien de modification
const userModify = document.querySelector(".user-modify");

const divModify = document.createElement("div");

const iconModify = document.createElement("i");
iconModify.classList.add("far", "fa-pen-to-square");

const textModify = document.createTextNode(" modifier");

divModify.appendChild(iconModify);
divModify.appendChild(textModify);
userModify.appendChild(divModify);
//************************************************************************ */

// Sélection des éléments de la modale
const modale = document.getElementById("modale");
const modalGallery = document.querySelector(".modal-gallery");

// Fonction pour ouvrir la modale
async function openModal() {
  if (modale) {
    // Vider le contenu existant de la modale
    modalGallery.innerHTML = "";

    // Créer et ajouter le texte de la galerie et le bouton de fermeture
    const modalText = document.createElement("span");
    modalText.textContent = "Galerie photo";
    modalText.classList.add("modal-text");

    const iconModal = document.createElement("i");
    iconModal.classList.add("fas", "fa-times", "close-modale");
    iconModal.addEventListener("click", closeModal);

    modalGallery.appendChild(modalText);
    modalGallery.appendChild(iconModal);

    // Créer et ajouter le conteneur d'images dynamiquement
    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("images-container");
    modalGallery.appendChild(imagesContainer);

    // Créer et ajouter le bouton "Ajouter une photo"
    const addPhotoButton = document.createElement("button");
    addPhotoButton.classList.add("add-photo-button");
    addPhotoButton.textContent = "Ajouter une photo";
    modalGallery.appendChild(addPhotoButton);

    // Récupérer les travaux et les ajouter au conteneur
    const works = await getWorks();
    works.forEach((work) => {
      const wrapper = document.createElement("div"); // Wrapper pour l'image et l'icône de suppression
      wrapper.classList.add("image-wrapper");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      wrapper.appendChild(img);

      // Création de l'icône de corbeille pour la suppression
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon");
      trashIcon.addEventListener("click", () => removeImage(work.id));

      // Ajoute l'événement de suppression
      wrapper.appendChild(trashIcon);

      imagesContainer.appendChild(wrapper);
    });

    modale.classList.remove("hidden");
    modale.style.visibility = "visible";
  }
}

// Fonction pour fermer la modale
function closeModal() {
  if (modale) {
    modale.style.visibility = "hidden";
    modale.classList.add("hidden");
  }
}
//****************************************************************** */
// // Fonction pour supprimer une image
function removeImage(id) {
  // Suppression de l'image via une requête API (à implémenter selon votre API)
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Actualiser la galerie après suppression
        openModal();
      } else {
        console.error("Erreur lors de la suppression de l'image");
      }
    })
    .catch((error) => {
      console.error("Il y a eu un problème avec la requête fetch:", error);
    });
}

// Événement pour ouvrir la modale
userModify.addEventListener("click", () => {
  openModal();
});

// Événement pour fermer la modale en cliquant n'importe où
window.addEventListener("click", (event) => {
  if (event.target === modale) {
    closeModal();
  }
});
