import PhotographerModel from "../models/PhotographerModel.js";
/**
 * Factory qui gère le modèle du photographe
 * @param {objet} data : représente un photographe
 * @returns un modèle de photographe
 */
export default function photographerFactory(data) {
  return new PhotographerModel(data);
}
