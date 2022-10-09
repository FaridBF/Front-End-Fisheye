// permet de retourner le template ou la vue
// son rôle est d'afficher les informations
class PhotographerCard {
  // reprend les attribut de Photographer
  constructor(photographer) {
    this._photographer = photographer;
  }
  userCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    // img.setAttribute("src", picture);
    // h2.textContent = name;
    const h2 = document.createElement("h2");
    article.appendChild(img);
    article.appendChild(h2);

    const userCardDOM = `
      <img
        alt="${this._photographer.name}"
        src="${this._photographer.portrait}"
      >
      <h2>${this._photographer.name}<h2/>
    `;

    article.innerHTML = userCardDOM;
    return article;
  }
}
