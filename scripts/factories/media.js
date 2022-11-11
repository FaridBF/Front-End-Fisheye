/**
 * Factory qui gère l'attribution du modèle en fonction du type de media
 * @param {object} data : représente un objet media
 * @param {string} mediaType : permet de déterminer type de media: "image" ou "video"
 * @returns
 */
function photographerMediaFactory(data, mediaType) {
  if (mediaType === "image") {
    return new ImageModel(data);
  } else if (mediaType === "video") {
    return new VideoModel(data);
  } else {
    throw "Unknown type format";
  }
}
