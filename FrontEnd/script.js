let filter = "0";

const getWorks = async () => {
  try {
    const datas = await fetch("http://localhost:5678/api/works");
    const works = await datas.json();
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
  } catch (error) {
    console.error("Il y a eu un problème avec la requête fetch:", error);
  }
};

getWorks();

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
