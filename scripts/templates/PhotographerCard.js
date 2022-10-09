// permet de retourner le template ou la vue
// son rôle est d'afficher les informations
class PhotographerCard {
  // reprend les attribut de Photographer
  constructor(photographer) {
    this._photographer = photographer;
  }
  userCardDOM() {
    const article = document.createElement("article");
    // const img = document.createElement("img");
    // const div = document.createElement("div");
    // const h2 = document.createElement("h2");
    // const p = document.createElement("p");
    // const span = document.createElement("span");

    // article.appendChild(img);
    // article.appendChild(div);

    // div.appendChild(h2);
    // div.appendChild(p);
    // div.appendChild(span);

    // comment éviter l'aspect redondant ici
    const userCardDOM = `
      <img 
        class="img_profil"
        alt=${this._photographer.name}
        src=${this._photographer.portrait}
      >
        <h2 
        > ${this._photographer.name}<h2/>
        <p>${this._photographer.location}<p/>
        <p>${this._photographer.tagline}<p/>
        <span>${this._photographer.price}/jour<span/>
    `;

    article.innerHTML = userCardDOM;
    return article;
  }
}
