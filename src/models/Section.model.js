import SectionService from "@/services/Section.service";
import constant from "@/constant";

/**
 * @typedef {Object} Section
 * @property {string} title - Título de la sección
 * @property {string} path - Ruta de la sección
 * @property {string} slug - Título amigable
 * @property {Section[]} children - Listado de secciones hijas
 */

export default class Section {

  /**
   * Obtiene el listado de secciones dentro de una ruta
   *
   * @param {String} path - Ruta base de las secciones
   * @return {Section[]} - Listado con las secciones
   * @throws {SectionError} - Error de Sección
   */
  static async getSections(path) {
    const sectionPath = `${path}/${constant.SECTION_FILE}`;
    return await SectionService.getSections(sectionPath);
  }
}
